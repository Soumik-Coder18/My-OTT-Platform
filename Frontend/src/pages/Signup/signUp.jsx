import React from 'react';
import Form from '../Login/Form';
import Loader from '../Login/Loader';

const SignUp = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[600px] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-r from-gray-800/50 to-purple-800/50 backdrop-blur-sm border border-purple-500/20">
        
        {/* Left - Loader (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 items-center justify-center p-6 scale-100 md:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm border-r border-purple-500/20">
          <Loader />
        </div>

        {/* Right - Form with defaultToSignup prop (Always visible) */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-800/80 to-purple-800/80 backdrop-blur-sm">
          <Form defaultToSignup />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
