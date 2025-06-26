import React from 'react';
import styled from 'styled-components';
import Form from './Form';
import Loader from './Loader';

const Login = () => {
  return (
    <LoginWrapper>
      <div className="container">
        <div className="left">
          <Loader />
        </div>
        <div className="right">
          <Form />
        </div>
      </div>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F4EBD3;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 0px;
    padding: 40px;
    border-radius: 15px;
    background-color: #ded3c4;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
    max-width: 1000px;
    width: 95%;
    height: 600px;
    overflow: hidden;
  }

  .left, .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left {
    flex: 1;
    min-width: 300px;
    position: relative;
    transform: scale(1.2); /* Bigger coffee loader */
  }

  .right {
    flex: 1;
    min-width: 300px;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      height: auto;
      padding: 20px;
    }

    .left, .right {
      transform: scale(1);
    }
  }
`;

export default Login;
