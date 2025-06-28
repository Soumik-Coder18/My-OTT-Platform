import React from 'react';
import Form from './Form';
import Loader from './Loader';

const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F4EBD3' }}>
      <div
        className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[600px] rounded-2xl shadow-xl overflow-hidden border"
        style={{ backgroundColor: '#DED3C4', borderColor: '#98A1BC' }}
      >
        {/* Left - Loader (Hidden on mobile) */}
        <div
          className="hidden md:flex flex-1 items-center justify-center p-6 scale-100 md:scale-110 transition-transform duration-300"
          style={{ backgroundColor: '#98A1BC' }}
        >
          <Loader />
        </div>

        {/* Right - Form (Always visible) */}
        <div
          className="flex-1 flex items-center justify-center p-8"
          style={{ backgroundColor: '#F4EBD3' }}
        >
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Login;
