import React from 'react';
import { motion } from 'framer-motion';

const Card = () => {
  return (
    <motion.div
      className="card relative flex h-[12em] w-[18em] items-start justify-center overflow-clip rounded-[1.5em] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 px-[1.5em] py-[2em] shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
      whileHover={{ scale: 1.05, y: -10 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <span className="max-w-[20ch] text-center font-semibold text-[1.1em] text-white leading-relaxed">
        Do you agree with the terms and conditions of our browsing platform?
      </span>
      <div className="group absolute bottom-[-1em] left-[2.5em] flex max-h-[6em] w-[10em] items-center justify-center gap-[11rem]">
        <motion.label
          htmlFor="yes"
          className="yes peer relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <input type="checkbox" name="yes" id="yes" className="peer appearance-none" />
          <svg xmlns="http://www.w3.org/2000/svg" width={43} height={90} fill="none" viewBox="0 0 43 90" className="absolute bottom-0 left-1/2 h-[6rem] w-[6rem] origin-bottom -translate-x-1/2 rotate-[45deg] hover:rotate-[40deg] duration-300 peer-checked:rotate-[0deg]">
            <path fill="#8b5cf6" d="M24.87 4.21a3.52 3.52 0 0 0-7.04 0v80.96a3.52 3.52 0 1 0 7.04 0V4.21Z" />
            <path fill="#374151" d="M21.35 89.34a4.17 4.17 0 0 1-4.17-4.17v-81a4.17 4.17 0 1 1 8.34 0v81a4.17 4.17 0 0 1-4.17 4.17Zm0-88a2.88 2.88 0 0 0-2.87 2.87v81a2.87 2.87 0 0 0 5.74 0v-81a2.88 2.88 0 0 0-2.87-2.87Z" />
            <path fill="#8b5cf6" d="M21.35 44.69c11.427 0 20.69-8.117 20.69-18.13 0-10.013-9.263-18.13-20.69-18.13C9.923 8.43.66 16.547.66 26.56c0 10.013 9.263 18.13 20.69 18.13Z" />
            <path fill="#374151" d="M21.35 45.34C9.58 45.34 0 36.92 0 26.56 0 16.2 9.58 7.78 21.35 7.78c11.77 0 21.34 8.42 21.34 18.78 0 10.36-9.57 18.78-21.34 18.78Zm0-36.26c-11 0-20 7.84-20 17.48s9 17.48 20 17.48 20-7.84 20-17.48-8.95-17.48-20-17.48Z" />
            <path fill="#6b7280" d="M.66 26.56v-4.99h41.38v3.92L.66 26.56Z" />
            <path fill="#374151" d="M0 27.23v-6.31h42.69v5.21L0 27.23Zm1.31-5v3.66l40.08-1v-2.67l-40.08.01Z" />
            <path fill="#6b7280" d="M21.35 40.6c11.427 0 20.69-8.117 20.69-18.13 0-10.013-9.263-18.13-20.69-18.13C9.923 4.34.66 12.457.66 22.47c0 10.013 9.263 18.13 20.69 18.13Z" />
            <path fill="#374151" d="M21.35 41.26C9.58 41.26 0 32.83 0 22.47S9.58 3.69 21.35 3.69c11.77 0 21.34 8.43 21.34 18.78 0 10.35-9.57 18.79-21.34 18.79Zm0-36.26c-11 0-20 7.84-20 17.47 0 9.63 9 17.48 20 17.48s20-7.84 20-17.48S32.4 5 21.35 5Z" />
            <path fill="#ffffff" d="M9.76 27.76v-4.28l-3.73-5.9h2.41l2.4 4 2.34-4h2.37l-3.74 5.91v4.27H9.76Zm7.59 0V17.58h7.55v1.72h-5.5v2.26h5.11v1.71H19.4v2.78h5.69v1.71h-7.74Zm9.941-3.31 2-.2a2.44 2.44 0 0 0 .73 1.44 2.21 2.21 0 0 0 1.49.48 2.28 2.28 0 0 0 1.5-.42 1.25 1.25 0 0 0 .51-1 .93.93 0 0 0-.17-.56 1.59 1.59 0 0 0-.74-.44c-.24-.09-.79-.23-1.64-.45a5.64 5.64 0 0 1-2.32-1 2.68 2.68 0 0 1-.5-3.51 2.79 2.79 0 0 1 1.27-1 5.061 5.061 0 0 1 2-.35 4.29 4.29 0 0 1 2.88.84 2.929 2.929 0 0 1 1 2.24l-2.06.09a1.72 1.72 0 0 0-.56-1.13 2.08 2.08 0 0 0-1.3-.34 2.34 2.34 0 0 0-1.41.37.71.71 0 0 0-.32.63.8.8 0 0 0 .3.62 5.679 5.679 0 0 0 1.89.68c.766.154 1.512.4 2.22.73a3 3 0 0 1 1.13 1 3.06 3.06 0 0 1-1.46 4.4 5.719 5.719 0 0 1-2.22.37 4.38 4.38 0 0 1-3-.89 3.89 3.89 0 0 1-1.22-2.6Z" />
          </svg>
        </motion.label>
        <motion.label
          htmlFor="no"
          className="no relative cursor-pointer origin-bottom duration-300 peer-has-[:checked]:rotate-[-160deg]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <input type="checkbox" name="no" id="no" className="peer appearance-none" />
          <svg xmlns="http://www.w3.org/2000/svg" width={42} height={89} fill="none" viewBox="0 0 42 89" className="absolute bottom-0 right-1/2 h-[6rem] w-[6rem] origin-bottom translate-x-1/2 rotate-[-45deg] duration-300 hover:rotate-[-40deg] peer-checked:rotate-0">
            <path fill="#6b7280" d="M21.481.49h-.48a3.35 3.35 0 0 0-3.35 3.35V85.1c0 1.85 1.5 3.35 3.35 3.35h.48c1.85 0 3.35-1.5 3.35-3.35V3.84c0-1.85-1.5-3.35-3.35-3.35Z" />
            <path fill="#374151" d="M23.131 45.03c10.118 0 18.32-8.202 18.32-18.32S33.25 8.39 23.132 8.39c-10.117 0-18.32 8.202-18.32 18.32s8.203 18.32 18.32 18.32Z" />
            <path fill="#8b5cf6" d="M18.801 45.03c10.118 0 18.32-8.202 18.32-18.32S28.92 8.39 18.801 8.39C8.684 8.39.481 16.592.481 26.71s8.203 18.32 18.32 18.32Z" />
            <path fill="#ffffff" d="M16.431 33.05a1.4 1.4 0 0 1-1.1-.52l-4.34-5.29v4.38a1.44 1.44 0 0 1-2.87 0v-8.37a1.44 1.44 0 0 1 1-1.35 1.42 1.42 0 0 1 1.59.44l4.28 5.28v-4.66a1.44 1.44 0 1 1 2.87 0v8.66a1.44 1.44 0 0 1-1 1.35 1.62 1.62 0 0 1-.43.08Zm8.221-.39a5.3 5.3 0 1 1 5.3-5.3 5.31 5.31 0 0 1-5.3 5.3Zm0-7.73a2.43 2.43 0 1 0 .019 4.859 2.43 2.43 0 0 0-.02-4.859Z" />
            <path fill="#374151" d="M21.541 89h-.49a3.86 3.86 0 0 1-3.86-3.86v-40a.519.519 0 0 1 1 0v40a2.84 2.84 0 0 0 2.83 2.84h.49a2.84 2.84 0 0 0 2.83-2.84V45a.52.52 0 1 1 1 0v40.14a3.86 3.86 0 0 1-3.8 3.86Zm3.34-78.97a.51.51 0 0 1-.51-.51V3.87a.52.52 0 0 1 1 0v5.62a.51.51 0 0 1-.49.54Zm-7.18-1.21a.51.51 0 0 1-.51-.51V3.87a3.84 3.84 0 0 1 3.85-3.86h.5a.51.51 0 1 1 0 1h-.49a2.83 2.83 0 0 0-2 .84 2.78 2.78 0 0 0-.82 2v4.44a.511.511 0 0 1-.53.53Z" />
            <path fill="#374151" d="M23.171 45.59a.52.52 0 0 1 0-1 17.81 17.81 0 0 0 14.89-27.6.51.51 0 1 1 .85-.56 18.83 18.83 0 0 1-15.74 29.16Zm10.25-33.52a.52.52 0 0 1-.29-.09 17.64 17.64 0 0 0-9.93-3 .51.51 0 0 1-.51-.51.54.54 0 0 1 .54-.51 18.75 18.75 0 0 1 10.51 3.21.53.53 0 0 1 .14.72.541.541 0 0 1-.46.18Z" />
            <path fill="#374151" d="M18.861 45.61a18.84 18.84 0 0 1-16.87-27.27 18.85 18.85 0 0 1 31-4.09.51.51 0 0 1-.05.73.5.5 0 0 1-.72 0 17.82 17.82 0 1 0 3.57 6.18.526.526 0 1 1 1-.33 18.87 18.87 0 0 1-17.93 24.78Z" />
            <path fill="#374151" d="M16.48 32.17a.51.51 0 0 1-.39-.19l-6-7.26v6.94a.52.52 0 0 1-1 0v-8.37a.51.51 0 0 1 .34-.48.5.5 0 0 1 .57.15l6 7.27V23a.52.52 0 1 1 1 0v8.66a.52.52 0 0 1-.52.51Zm8.221-.39a4.38 4.38 0 1 1 4.38-4.38 4.39 4.39 0 0 1-4.38 4.38Zm0-7.73a3.35 3.35 0 1 0 .02 6.7 3.35 3.35 0 0 0-.02-6.7Z" />
          </svg>
        </motion.label>
      </div>
    </motion.div>
  );
}

export default Card;
