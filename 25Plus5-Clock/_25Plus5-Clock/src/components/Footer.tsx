import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 pb-6 rounded-lg border border-yellow-500/30">
      <p className="text-gray-400 my-2 font-medium">👨‍💻 Dev: Jesús Lautaro Careglio Albornoz.</p>
      <hr className="my-2 border-yellow-500/30" />
      <p className="text-gray-400 font-medium">
        ⚙️ Created with React, Redux-Toolkit, TypeScript and Tailwind CSS.
        <br />
        🔩 Also worked with Bun, Vite, SASS, Prettier and ESLint.
      </p>
      <hr className="my-2 border-yellow-500/30" />
      <p className="text-gray-400 font-medium">
        {'👀 Check out the '}
        <a
          href="https://github.com/JLCareglio/freecodecamp/tree/main/25Plus5-Clock/_25Plus5-Clock"
          className="text-blue-400 underline hover:text-blue-300 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          source code
        </a>
        {' and also the rest of '}
        <a
          href="https://jlcareglio.github.io/freecodecamp/"
          className="text-blue-400 underline hover:text-blue-300 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          my freeCodeCamp projects
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
