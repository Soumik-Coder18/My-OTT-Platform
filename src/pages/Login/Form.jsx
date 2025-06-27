// import React from 'react';
// import styled from 'styled-components';

// const Form = () => {
//   return (
//     <StyledWrapper>
//       <div className="wrapper">
//         <div className="card-switch">
//           <label className="switch">
//             <input type="checkbox" className="toggle" />
//             <span className="slider" />
//             <span className="card-side" />
//             <div className="flip-card__inner">
//               <div className="flip-card__front">
//                 <div className="title">Log in</div>
//                 <form className="flip-card__form" action>
//                   <input className="flip-card__input" name="email" placeholder="Email" type="email" />
//                   <input className="flip-card__input" name="password" placeholder="Password" type="password" />
//                   <button className="flip-card__btn">Let`s go!</button>
//                 </form>
//               </div>
//               <div className="flip-card__back">
//                 <div className="title">Sign up</div>
//                 <form className="flip-card__form" action>
//                   <input className="flip-card__input" placeholder="Name" type="name" />
//                   <input className="flip-card__input" name="email" placeholder="Email" type="email" />
//                   <input className="flip-card__input" name="password" placeholder="Password" type="password" />
//                   <button className="flip-card__btn">Confirm!</button>
//                 </form>
//               </div>
//             </div>
//           </label>
//         </div>   
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .wrapper {
//     --input-focus: #98A1BC;
//     --font-color: #323232;
//     --font-color-sub: #666;
//     --bg-color: #fff;
//     --bg-color-alt: #666;
//     --main-color: #323232;
//       /* display: flex; */
//       /* flex-direction: column; */
//       /* align-items: center; */
//   }
//   /* switch card */
//   .switch {
//     transform: translateY(-200px);
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 30px;
//     width: 50px;
//     height: 20px;
//   }

//   .card-side::before {
//     position: absolute;
//     content: 'Log in';
//     left: -70px;
//     top: 0;
//     width: 100px;
//     text-decoration: underline;
//     color: var(--font-color);
//     font-weight: 600;
//   }

//   .card-side::after {
//     position: absolute;
//     content: 'Sign up';
//     left: 70px;
//     top: 0;
//     width: 100px;
//     text-decoration: none;
//     color: var(--font-color);
//     font-weight: 600;
//   }

//   .toggle {
//     opacity: 0;
//     width: 0;
//     height: 0;
//   }

//   .slider {
//     box-sizing: border-box;
//     border-radius: 5px;
//     border: 2px solid var(--main-color);
//     box-shadow: 4px 4px var(--main-color);
//     position: absolute;
//     cursor: pointer;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: var(--bg-colorcolor);
//     transition: 0.3s;
//   }

//   .slider:before {
//     box-sizing: border-box;
//     position: absolute;
//     content: "";
//     height: 20px;
//     width: 20px;
//     border: 2px solid var(--main-color);
//     border-radius: 5px;
//     left: -2px;
//     bottom: 2px;
//     background-color: var(--bg-color);
//     box-shadow: 0 3px 0 var(--main-color);
//     transition: 0.3s;
//   }

//   .toggle:checked + .slider {
//     background-color: var(--input-focus);
//   }

//   .toggle:checked + .slider:before {
//     transform: translateX(30px);
//   }

//   .toggle:checked ~ .card-side:before {
//     text-decoration: none;
//   }

//   .toggle:checked ~ .card-side:after {
//     text-decoration: underline;
//   }

//   /* card */ 

//   .flip-card__inner {
//     width: 300px;
//     height: 350px;
//     position: relative;
//     background-color: transparent;
//     perspective: 1000px;
//       /* width: 100%;
//       height: 100%; */
//     text-align: center;
//     transition: transform 0.8s;
//     transform-style: preserve-3d;
//   }

//   .toggle:checked ~ .flip-card__inner {
//     transform: rotateY(180deg);
//   }

//   .toggle:checked ~ .flip-card__front {
//     box-shadow: none;
//   }

//   .flip-card__front, .flip-card__back {
//     padding: 20px;
//     position: absolute;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     -webkit-backface-visibility: hidden;
//     backface-visibility: hidden;
//     background: #98A1BC;
//     gap: 20px;
//     border-radius: 5px;
//     border: 2px solid var(--main-color);
//     box-shadow: 4px 4px var(--main-color);
//   }

//   .flip-card__back {
//     width: 100%;
//     transform: rotateY(180deg);
//   }

//   .flip-card__form {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 20px;
//   }

//   .title {
//     margin: 20px 0 20px 0;
//     font-size: 25px;
//     font-weight: 900;
//     text-align: center;
//     color: var(--main-color);
//   }

//   .flip-card__input {
//     width: 250px;
//     height: 40px;
//     border-radius: 5px;
//     border: 2px solid var(--main-color);
//     background-color: var(--bg-color);
//     box-shadow: 4px 4px var(--main-color);
//     font-size: 15px;
//     font-weight: 600;
//     color: var(--font-color);
//     padding: 5px 10px;
//     outline: none;
//   }

//   .flip-card__input::placeholder {
//     color: var(--font-color-sub);
//     opacity: 0.8;
//   }

//   .flip-card__input:focus {
//     border: 2px solid var(--input-focus);
//   }

//   .flip-card__btn:active, .button-confirm:active {
//     box-shadow: 0px 0px var(--main-color);
//     transform: translate(3px, 3px);
//   }

//   .flip-card__btn {
//     margin: 20px 0 20px 0;
//     width: 120px;
//     height: 40px;
//     border-radius: 5px;
//     border: 2px solid var(--main-color);
//     background-color: var(--bg-color);
//     box-shadow: 4px 4px var(--main-color);
//     font-size: 17px;
//     font-weight: 600;
//     color: var(--font-color);
//     cursor: pointer;
//   }`;

// export default Form;


import React, { useState, useEffect } from 'react';

const Form = ({ defaultToSignup = false }) => {
  const [flipped, setFlipped] = useState(defaultToSignup);

  useEffect(() => {
    setFlipped(defaultToSignup);
  }, [defaultToSignup]);

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
            <form className="flex flex-col items-center gap-4 w-full px-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <input
                type="password"
                placeholder="Password"
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
            <form className="flex flex-col items-center gap-4 w-full px-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-10 px-3 border-2 border-[#555879] rounded-md bg-[#DED3C4] text-[#555879] placeholder-[#555879] font-semibold shadow-[4px_4px_0_#555879] focus:outline-none focus:border-[#98A1BC]"
              />
              <input
                type="password"
                placeholder="Password"
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

