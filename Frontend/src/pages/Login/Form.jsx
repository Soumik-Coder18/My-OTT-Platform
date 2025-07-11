import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const Form = ({ defaultToSignup = false }) => {
  const [flipped, setFlipped] = useState(defaultToSignup);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFlipped(defaultToSignup);
  }, [defaultToSignup]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await API.post('/users/login', { email, password });
      alert('Login successful');
      console.log(response.data);
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;
      const response = await API.post('/users/register', { username, email, password });
      alert('Registration successful');
      console.log(response.data);
    } catch (error) {
      alert('Registration failed');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Toggle Switch */}
      <div className="relative mb-6 flex items-center justify-center gap-8">
        <span
          className={`text-sm font-semibold transition-all duration-300 underline ${!flipped ? 'text-[#555879]' : 'text-[#DED3C4]'}`}
        >
          Log in
        </span>

        <label className="relative w-14 h-8 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={flipped}
            onChange={() => setFlipped(!flipped)}
          />
          <div className="absolute top-0 left-0 w-full h-full border-2 border-[#555879] bg-[#F4EBD3] rounded-md shadow-[4px_4px_0_#555879] transition duration-300 peer-checked:bg-[#98A1BC]" />
          <div className="absolute top-[2px] left-[2px] h-[24px] w-[24px] bg-[#DED3C4] border-2 border-[#555879] rounded-md shadow-[0_3px_0_#555879] transition-transform duration-300 peer-checked:translate-x-6" />
        </label>

        <span
          className={`text-sm font-semibold transition-all duration-300 underline ${flipped ? 'text-[#555879]' : 'text-[#DED3C4]'}`}
        >
          Sign up
        </span>
      </div>

      {/* Flip Card */}
      <div className="relative w-[300px] h-[370px] [perspective:1000px]">
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front: Login */}
          <div className="absolute w-full h-full bg-[#98A1BC] border-2 border-[#555879] shadow-[4px_4px_0_#555879] rounded-md flex flex-col items-center justify-center gap-4 [backface-visibility:hidden]">
            <h2 className="text-xl font-bold text-[#555879] mb-2">Log in</h2>
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 w-full px-4">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <button
                type="submit"
                className="mt-2 w-28 h-10 bg-[#DED3C4] text-[#555879] font-bold border-2 border-[#555879] rounded-md shadow-[4px_4px_0_#555879] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
              >
                Let's go!
              </button>
            </form>
          </div>

          {/* Back: Signup */}
          <div className="absolute w-full h-full bg-[#98A1BC] border-2 border-[#555879] shadow-[4px_4px_0_#555879] rounded-md flex flex-col items-center justify-center gap-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h2 className="text-xl font-bold text-[#555879] mb-2">Sign up</h2>
            <form onSubmit={handleRegister} className="flex flex-col items-center gap-4 w-full px-4">
              <input
                name="username"
                type="text"
                placeholder="Name"
                value={formData.username}
                onChange={handleChange}
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <button
                type="submit"
                className="mt-2 w-28 h-10 bg-[#DED3C4] text-[#555879] font-bold border-2 border-[#555879] rounded-md shadow-[4px_4px_0_#555879] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
              >
                Confirm!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;