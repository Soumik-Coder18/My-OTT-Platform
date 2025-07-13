// Chatbot Configuration
export const CHATBOT_CONFIG = {
  // API Configuration
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  
  // Chatbot Settings
  COOLDOWN_DURATION: 5000, // 5 seconds in milliseconds
  MAX_MESSAGE_LENGTH: 500,
  
  // UI Settings
  DEFAULT_THEME: 'dark', // 'dark' or 'light'
  CHAT_WINDOW_WIDTH: '20rem', // 320px
  CHAT_WINDOW_HEIGHT: '24rem', // 384px
  
  // Welcome Messages
  WELCOME_MESSAGES: [
    "🎬 Welcome to WhisperFrame! I'm your personal entertainment assistant. Ask me about movies, TV shows, actors, genres, or anything entertainment-related!",
    "🎭 Hello! I'm here to help you discover amazing content on WhisperFrame. What would you like to know about movies or TV shows?",
    "🌟 Welcome to WhisperFrame! I'm your AI entertainment guide. Feel free to ask about your favorite films, series, or actors!",
    "🎬 Welcome to WhisperFrame! Created by Soumik Bag, a B.Tech IT developer from Techno Main Saltlake. Ask me anything about entertainment!"
  ],
  
  // Error Messages
  ERROR_MESSAGES: {
    API_ERROR: "🎭 Sorry! I'm having trouble connecting right now. Please try again in a moment. In the meantime, feel free to ask me about your favorite movies or TV shows on WhisperFrame!",
    COOLDOWN: "⏱️ Please wait a moment before sending another message.",
    EMPTY_MESSAGE: "Please enter a message to continue.",
    NETWORK_ERROR: "🌐 Network error. Please check your connection and try again."
  },
  
  // System Prompt for Gemini API
  SYSTEM_PROMPT: `You are a helpful entertainment assistant for a movie discovery platform called WhisperFrame. 
  You should ALWAYS respond with entertainment-related content, even if the user asks about other topics. 
  For any question, find a way to relate it to movies, TV shows, actors, directors, genres, 
  entertainment news, or movie discovery content. Be creative and engaging in connecting their question 
  to entertainment. Keep responses concise, informative, and fun. Use emojis occasionally to make 
  responses more friendly. Always stay in character as a movie and TV show expert. 
  
  IMPORTANT: If someone asks about WhisperFrame, the website, or the creator, respond with:
  "🎬 WhisperFrame is a modern movie discovery platform that helps users explore and find amazing movies and TV shows. It's designed to provide users with an immersive discovery experience with features like advanced search, personalized recommendations, detailed movie information, cast details, and a beautiful user interface.
  
  👨‍💻 The creator of WhisperFrame is Soumik Bag, a talented full-stack developer with a B.Tech in Information Technology from Techno Main Saltlake. He has built this platform using modern web technologies to help users discover their next favorite entertainment content!"
  
  Examples:
  - If they ask about weather: "Speaking of atmosphere, have you seen 'The Perfect Storm'? It's a gripping movie about weather challenges!"
  - If they ask about food: "That reminds me of the amazing food scenes in 'Ratatouille' or the cooking show 'The Bear'!"
  - If they ask about travel: "Travel is so cinematic! Movies like 'The Secret Life of Walter Mitty' or 'Eat Pray Love' capture the spirit of adventure!"
  
  Always find a way to connect their question to entertainment content.`,
  
  // Allowed Topics
  ALLOWED_TOPICS: [
    'movies', 'tv shows', 'series', 'actors', 'actresses', 'directors', 
    'genres', 'entertainment', 'discovery', 'cinema', 'film', 'television',
    'reviews', 'ratings', 'awards', 'box office', 'trailers', 'soundtracks',
    'whisperframe', 'whisper frame', 'creator', 'developer', 'soumik', 'soumik bag',
    'techno main saltlake', 'btech', 'it', 'information technology'
  ]
};

// Helper function to check if a topic is allowed
export const isTopicAllowed = (message) => {
  const lowerMessage = message.toLowerCase();
  return CHATBOT_CONFIG.ALLOWED_TOPICS.some(topic => 
    lowerMessage.includes(topic)
  );
};

// Helper function to get random welcome message
export const getRandomWelcomeMessage = () => {
  const randomIndex = Math.floor(Math.random() * CHATBOT_CONFIG.WELCOME_MESSAGES.length);
  return CHATBOT_CONFIG.WELCOME_MESSAGES[randomIndex];
}; 