import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageCircle, Loader2 } from 'lucide-react';
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
        className="relative p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
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
        <div className="absolute bottom-16 right-0 w-80 h-96 rounded-lg shadow-2xl border bg-gray-900 border-gray-700 transition-all duration-300 max-h-[80vh] overflow-hidden">
          
          {/* Header */}
          <div className="p-4 rounded-t-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">WhisperFrame AI</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user'
                      ? 'text-purple-200'
                      : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs px-3 py-2 rounded-lg bg-gray-800 text-gray-100">
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
          <div className="p-4 border-t bg-gray-900 border-gray-700">
            <div className="flex space-x-2">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={cooldown ? `Please wait ${cooldownTime}s...` : "Ask about movies, shows, actors..."}
                disabled={isLoading || cooldown}
                className={`flex-1 p-2 text-sm rounded-lg resize-none focus:outline-none focus:ring-2 bg-gray-800 text-white placeholder-gray-400 focus:ring-purple-500 ${(isLoading || cooldown) ? 'opacity-50 cursor-not-allowed' : ''}`}
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || cooldown}
                className={`p-2 rounded-lg transition-colors relative ${
                  !inputMessage.trim() || isLoading || cooldown
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
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