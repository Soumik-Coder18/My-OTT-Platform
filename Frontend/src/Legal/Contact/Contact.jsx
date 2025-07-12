import React from 'react';
import Card from './Card';
import Form from './Form';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 px-4 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-gray-800/50 to-purple-800/50 backdrop-blur-sm border border-purple-500/20">
        
        {/* Left Side - Card */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm flex justify-center items-center p-6 md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none border-r border-purple-500/20">
          <Card />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-800/80 to-purple-800/80 backdrop-blur-sm p-6 md:rounded-r-2xl rounded-b-2xl md:rounded-bl-none">
          <Form />
        </div>

      </div>
    </div>
  );
};

export default Contact;
