import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Loader2, Server } from 'lucide-react';

const Form = ({ defaultToSignup = false }) => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [flipped, setFlipped] = useState(defaultToSignup);
  const [isLoading, setIsLoading] = useState(false);
  const [isColdStart, setIsColdStart] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFlipped(defaultToSignup);
  }, [defaultToSignup]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cold start detection and retry logic
  const handleColdStart = async (apiCall, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await Promise.race([
          apiCall(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 15000)
          )
        ]);
        
        // If we get here, server is responding - no cold start needed
        setIsColdStart(false);
        setRetryCount(0);
        return response;
        
      } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error.message);
        
        // Check if it's a server connectivity issue (not auth error)
        const isServerError = error.code === 'ERR_NETWORK' || 
                             error.message === 'Request timeout' ||
                             error.response?.status >= 500 ||
                             !error.response; // No response means server is down
        
        const isAuthError = error.response?.status === 401 || 
                           error.response?.status === 400;
        
        // Only show cold start messages for actual server issues
        if (isServerError && !isAuthError) {
          if (attempt === 1) {
            setIsColdStart(true);
            showToast('🔄 Server is starting up, please wait...', 'info', 5000);
          } else if (attempt < maxRetries) {
            const waitTime = attempt * 2000; // Progressive delay: 2s, 4s, 6s
            showToast(`⏳ Server is still starting... Retrying in ${waitTime/1000}s (${attempt}/${maxRetries})`, 'warning', waitTime);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          } else {
            setIsColdStart(false);
            setRetryCount(0);
            throw new Error('Server is taking longer than expected. Please try again.');
          }
        } else {
          // For auth errors or other non-server issues, don't retry
          setIsColdStart(false);
          setRetryCount(0);
          throw error;
        }
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    const { email, password } = formData;
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await handleColdStart(() => 
        API.post('/api/users/login', { email, password })
      );
      
      showToast('🎉 Login successful! Welcome back!', 'success');
      console.log(response.data);
      
      // Use the auth context to login
      if (response.data?.data?.token) {
        login(response.data.data.user, response.data.data.token);
      }
      
      // Redirect to intended destination or home page
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Login failed';
      
      if (message === 'Email and password are required') {
        showToast('Please enter both email and password.', 'error');
      } else if (message === 'Invalid credentials') {
        showToast('❌ Invalid email or password. Please try again.', 'error');
      } else if (message === 'Request timeout' || message === 'Server is taking longer than expected. Please try again.') {
        showToast('⏰ Server is taking longer than expected. Please try again.', 'error');
      } else if (error.code === 'ERR_NETWORK') {
        showToast('🌐 Network error. Please check your connection and try again.', 'error');
      } else {
        showToast(`❌ ${message}`, 'error');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await handleColdStart(() => 
        API.post('/api/users/register', {
          username,
          email,
          password
        })
      );
      
      // Registration successful - automatically log in
      showToast('🎉 Registration successful! Welcome to WhisperFrame!', 'success');
      console.log(response.data);
      
      // Use the auth context to login
      if (response.data?.data?.token) {
        login(response.data.data.user, response.data.data.token);
      }
      
      // Redirect to intended destination or home page
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Registration failed';

      if (message === 'All fields are required') {
        showToast('Please fill in all fields.', 'error');
      } else if (message === 'User already exists') {
        showToast('❌ An account with this email already exists.', 'error');
      } else if (message === 'Username already taken') {
        showToast('❌ This username is already taken.', 'error');
      } else if (message === 'Request timeout' || message === 'Server is taking longer than expected. Please try again.') {
        showToast('⏰ Server is taking longer than expected. Please try again.', 'error');
      } else if (error.code === 'ERR_NETWORK') {
        showToast('🌐 Network error. Please check your connection and try again.', 'error');
      } else {
        showToast(`❌ ${message}`, 'error');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Enhanced Toggle Switch */}
      <div className="relative mb-8 flex items-center justify-center gap-6">
        <span
          className={`text-sm font-semibold transition-all duration-300 ${!flipped ? 'text-white' : 'text-purple-300'}`}
        >
          Log in
        </span>

        <label className="relative w-20 h-10 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={flipped}
            onChange={() => setFlipped(!flipped)}
            disabled={isLoading}
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-purple-300 transition-all duration-300
            peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:via-pink-500 peer-checked:to-pink-600
            bg-[#392866]" />
          <div className="absolute top-1/2 left-1.5 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-300 transform -translate-y-1/2 peer-checked:translate-x-10" />
        </label>

        <span
          className={`text-sm font-semibold transition-all duration-300 ${flipped ? 'text-white' : 'text-purple-300'}`}
        >
          Sign up
        </span>
      </div>

      {/* Flip Card */}
      <div className="relative w-[320px] h-[400px] [perspective:1000px]">
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front: Login */}
          <div className="absolute w-full h-full bg-gradient-to-br from-gray-800/90 to-purple-800/80 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 [backface-visibility:hidden] p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome Back</h2>
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-5 w-full">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full h-12 px-4 border-2 border-purple-500/30 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 font-medium backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full h-12 px-4 border-2 border-purple-500/30 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 font-medium backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-32 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isColdStart ? 'animate-pulse' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isColdStart && <Server className="w-4 h-4 animate-pulse" />}
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </form>
          </div>

          {/* Back: Signup */}
          <div className="absolute w-full h-full bg-gradient-to-br from-gray-800/90 to-purple-800/80 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-5 [transform:rotateY(180deg)] [backface-visibility:hidden] p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Join Us</h2>
            <form onSubmit={handleRegister} className="flex flex-col items-center gap-4 w-full">
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full h-12 px-4 border-2 border-purple-500/30 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 font-medium backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full h-12 px-4 border-2 border-purple-500/30 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 font-medium backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full h-12 px-4 border-2 border-purple-500/30 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 font-medium backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-32 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isColdStart ? 'animate-pulse' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isColdStart && <Server className="w-4 h-4 animate-pulse" />}
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;