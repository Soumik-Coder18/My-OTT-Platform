import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

const Form = () => {
  const { showToast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Auto-fill email if user is logged in
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setEmail(user.email);
      setName(user.username || '');
    }
  }, [isAuthenticated, user]);

  const handleSend = async () => {
    try {
      await API.post('/contact', {
        name,
        email,
        message,
      });
      showToast('Message sent successfully', 'success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      showToast('Failed to send message', 'error');
      console.error(error);
    }
  };

  const handleReset = () => {
    if (isAuthenticated && user?.email) {
      // Keep email and name if user is logged in
      setEmail(user.email);
      setName(user.username || '');
    } else {
      // Clear all fields if not logged in
      setName('');
      setEmail('');
    }
    setMessage('');
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <div className="form">
          <span className="heading">Get in touch</span>
          <input 
            placeholder="Name" 
            type="text" 
            className="input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            placeholder="Email" 
            type="email" 
            className="input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            readOnly={isAuthenticated && user?.email}
            style={isAuthenticated && user?.email ? { opacity: 0.8, cursor: 'not-allowed' } : {}}
          />
          {isAuthenticated && user?.email && (
            <small style={{ color: '#a855f7', fontSize: '0.8rem', marginBottom: '10px', display: 'block' }}>
              Email auto-filled from your account
            </small>
          )}
          <textarea 
            placeholder="Say Hello" 
            rows={10} 
            cols={30} 
            className="textarea" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          <div className="button-container">
            <button onClick={handleSend} className="send-button">Send</button>
            <div className="reset-button-container">
              <button onClick={handleReset} className="reset-button">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-container {
    max-width: 700px;
    margin: 30px;
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(88, 28, 135, 0.8) 100%);
    padding: 30px;
    border-left: 5px solid #a855f7;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.1);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
  }

  .form-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(168, 85, 247, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .form-container:hover::before {
    transform: translateX(100%);
  }

  .heading {
    display: block;
    color: #ffffff;
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 25px;
    text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
  }

  .input {
    color: #ffffff;
    width: 100%;
    background: rgba(168, 85, 247, 0.1);
    border: 2px solid rgba(168, 85, 247, 0.3);
    outline: none;
    padding: 12px 16px;
    margin-bottom: 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .input:focus {
    border-color: #a855f7;
    background: rgba(168, 85, 247, 0.2);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
    transform: translateY(-2px);
  }

  .textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid rgba(168, 85, 247, 0.3);
    outline: none;
    background: rgba(168, 85, 247, 0.1);
    color: #ffffff;
    font-weight: 500;
    resize: none;
    max-height: 150px;
    margin-bottom: 25px;
    border-radius: 12px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .textarea::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .textarea:focus {
    border-color: #a855f7;
    background: rgba(168, 85, 247, 0.2);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
    transform: translateY(-2px);
  }

  .button-container {
    display: flex;
    gap: 15px;
  }

  .send-button {
    flex-basis: 70%;
    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
    padding: 12px 20px;
    color: #ffffff;
    text-align: center;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
  }

  .send-button:hover {
    background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5);
  }

  .send-button:active {
    transform: translateY(-1px);
  }

  .reset-button-container {
    flex-basis: 30%;
  }

  .reset-button {
    width: 100%;
    text-align: center;
    padding: 12px 20px;
    color: #a855f7;
    font-weight: 600;
    background: rgba(168, 85, 247, 0.1);
    border: 2px solid #a855f7;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    backdrop-filter: blur(10px);
  }

  .reset-button:hover {
    background: #a855f7;
    color: #ffffff;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
  }

  .reset-button:active {
    transform: translateY(-1px);
  }
`;

export default Form;
