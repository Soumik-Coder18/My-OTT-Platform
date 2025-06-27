import React from 'react';
import styled from 'styled-components';

const Form = () => {
  return (
    <StyledWrapper>
      <div className="form-container">
        <div className="form">
          <span className="heading">Get in touch</span>
          <input placeholder="Name" type="text" className="input" />
          <input placeholder="Email" id="mail" type="email" className="input" />
          <textarea placeholder="Say Hello" rows={10} cols={30} id="message" name="message" className="textarea" defaultValue={""} />
          <div className="button-container">
            <div className="send-button">Send</div>
            <div className="reset-button-container">
              <div id="reset-btn" className="reset-button">Reset</div>
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
    background-color: #555879;
    padding: 30px;
    border-left: 5px solid #DED3C4;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
  }

  .heading {
    display: block;
    color: #F4EBD3;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 20px;
  }

  .input {
    color: #F4EBD3;
    width: 100%;
    background-color: #98A1BC;
    border: none;
    outline: none;
    padding: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
    border-left: 1px solid transparent;
  }

  .input:focus {
    border-left: 5px solid #DED3C4;
  }

  .textarea {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    background-color: #98A1BC;
    color: #DED3C4;
    font-weight: bold;
    resize: none;
    max-height: 150px;
    margin-bottom: 20px;
    border-left: 1px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  .textarea:focus {
    border-left: 5px solid #DED3C4;
  }

  .button-container {
    display: flex;
    gap: 10px;
  }

  .send-button {
    flex-basis: 70%;
    background: #DED3C4;
    padding: 10px;
    color: #555879;
    text-align: center;
    font-weight: bold;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  .send-button:hover {
    background: transparent;
    border: 1px solid #DED3C4;
    color: #DED3C4;
  }

  .reset-button-container {
    filter: drop-shadow(1px 1px 0px #DED3C4);
    flex-basis: 30%;
  }

  .reset-button {
    position: relative;
    text-align: center;
    padding: 10px;
    color: #DED3C4;
    font-weight: bold;
    background: #555879;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
    transition: all 0.2s ease-in-out;
  }

  .reset-button:hover {
    background: #DED3C4;
    color: #555879;
  }
`;

export default Form;
