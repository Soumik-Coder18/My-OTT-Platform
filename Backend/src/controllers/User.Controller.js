import {User} from '../models/User.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {apiError} from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

// Register User
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new apiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new apiError(400, 'User already exists');
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new apiError(400, 'Username already taken');
  }

  const user = await User.create({ username, email, password });
  const token = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

  res.status(201).json(
    new apiResponse(201, { token, user }, 'User registered successfully')
  );
});

// Login User
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.warn('Login failed: user not found for email', email);
    throw new apiError(401, 'Invalid credentials');
  }

  const isMatch = await user.isPasswordCorrect(password);
  console.log('Attempting login for:', email);
  console.log('Stored hashed password:', user.password);
  console.log('Password match result:', isMatch);

  if (!isMatch) {
    console.warn('Login failed: incorrect password for email', email);
    throw new apiError(401, 'Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

  res.status(200).json(
    new apiResponse(200, { token, user: { id: user._id, username: user.username, email: user.email } }, 'Login successful')
  );
});

// Get current user
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    throw new apiError(404, 'User not found');
  }

  res.status(200).json(new apiResponse(200, user, 'User profile fetched successfully'));
});
