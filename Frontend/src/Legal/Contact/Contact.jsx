import React from 'react';
import Card from './Card';
import Form from './Form';

const Contact = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-[#F4EBD3]">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg">
        
        {/* Left Side - Card */}
        <div className="w-full md:w-1/2 bg-[#98A1BC] flex justify-center items-center p-6 md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none">
          <Card />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-[#DED3C4] p-6 md:rounded-r-2xl rounded-b-2xl md:rounded-bl-none">
          <Form />
        </div>

      </div>
    </div>
  );
};

export default Contact;
