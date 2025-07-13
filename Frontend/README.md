# WhisperFrame OTT Platform

A modern streaming platform built with React, Vite, and Tailwind CSS.

## Features

- 🎬 Movie and TV Show browsing
- 🔍 Advanced search and filtering
- 👤 User authentication
- 💬 AI Chatbot Assistant
- 📱 Responsive design
- 🌙 Dark/Light theme support

## Chatbot Setup

The platform includes an AI-powered chatbot that can answer questions about movies, TV shows, actors, and entertainment topics. The chatbot is designed to always provide entertainment-related responses, even when users ask about other topics.

### Environment Variables

Create a `.env` file in the Frontend directory with your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key and add it to your `.env` file

### Chatbot Features

- **Position**: Bottom-right corner with high z-index
- **Theme**: Dark/light mode toggle
- **Cooldown**: 5-second cooldown between messages
- **Content**: Always responds with entertainment-related content
- **Styling**: Modern UI with Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- Lucide React Icons
- Google Gemini AI API
- React Router DOM
- Framer Motion
