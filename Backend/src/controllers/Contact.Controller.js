

import ContactMessage from '../models/Contact.models.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const savedMessage = await ContactMessage.create({ name, email, message });

    return res.status(201).json({ success: true, message: 'Message received successfully.', data: savedMessage });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};