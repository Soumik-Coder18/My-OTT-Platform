import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageCircle, Loader2, Sparkles } from 'lucide-react';
import { CHATBOT_CONFIG, getRandomWelcomeMessage } from '../config/chatbot';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: getRandomWelcomeMessage(),
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isDark, setIsDark] = useState(CHATBOT_CONFIG.DEFAULT_THEME === 'dark');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || cooldown) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setCooldown(true);

    try {
      const response = await fetch(CHATBOT_CONFIG.GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${CHATBOT_CONFIG.SYSTEM_PROMPT}\n\nUser's question: ${userMessage.content}`
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.candidates[0].content.parts[0].text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: CHATBOT_CONFIG.ERROR_MESSAGES.API_ERROR,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Cooldown timer with countdown
      setCooldown(true);
      setCooldownTime(CHATBOT_CONFIG.COOLDOWN_DURATION / 1000);
      
      const countdownInterval = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isDark 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
        }`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative">
            <MessageCircle size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-16 right-0 w-80 h-96 rounded-lg shadow-2xl border ${
          isDark 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        } transition-all duration-300 max-h-[80vh] overflow-hidden`}>
          
          {/* Header */}
          <div className={`p-4 rounded-t-lg ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } text-white flex items-center justify-between`}>
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">WhisperFrame AI</span>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <Sparkles size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className={`h-64 overflow-y-auto p-4 space-y-3 ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.type === 'user'
                    ? isDark
                      ? 'bg-purple-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDark
                      ? 'bg-gray-800 text-gray-100'
                      : 'bg-white text-gray-800 border'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user'
                      ? 'text-purple-200'
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800 border'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={cooldown ? `Please wait ${cooldownTime}s...` : "Ask about movies, shows, actors..."}
                disabled={isLoading || cooldown}
                className={`flex-1 p-2 text-sm rounded-lg resize-none focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500'
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-blue-500'
                } ${(isLoading || cooldown) ? 'opacity-50 cursor-not-allowed' : ''}`}
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || cooldown}
                className={`p-2 rounded-lg transition-colors relative ${
                  !inputMessage.trim() || isLoading || cooldown
                    ? isDark
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isDark
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {cooldown ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
            
            {cooldown && (
              <div className="mt-2 space-y-1">
                <div className="text-xs text-center text-gray-500">
                  ⏱️ Cooldown: {cooldownTime} seconds remaining
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-1000 ease-linear"
                    style={{ 
                      width: `${((CHATBOT_CONFIG.COOLDOWN_DURATION / 1000 - cooldownTime) / (CHATBOT_CONFIG.COOLDOWN_DURATION / 1000)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 