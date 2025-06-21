import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 pb-2 rounded-lg border border-yellow-500/30">
      <p className="text-gray-400 my-2 font-medium">👨‍💻 Dev: Jesús Lautaro Careglio Albornoz.</p>
      <hr className="my-2 border-yellow-500/30" />
      <p className="text-gray-400 font-medium">
        ⚙️ Created with React, Redux-Toolkit, TypeScript and Tailwind CSS.
        <br />
        🔩 Also worked with Vite, SASS, Prettier and ESLint.
      </p>
      <hr className="my-2 border-yellow-500/30" />
      <p className="text-gray-400 font-medium text-balance">
        {'👀 Check out the '}
        <a
          href="https://github.com/JLCareglio/freecodecamp/tree/main/25Plus5-Clock/_25Plus5-Clock"
          className="text-blue-400 underline hover:text-blue-300 transition-colors duration-300"
        >
          source code
        </a>
        <span
          className="new-tab-link"
          onClick={() =>
            window.open(
              'https://github.com/JLCareglio/freecodecamp/tree/main/25Plus5-Clock/_25Plus5-Clock',
              '_blank',
              'noopener,noreferrer'
            )
          }
        >
          <sup>{'\u2197\uFE0E'}</sup>
        </span>
        {' and also the rest of my '}
        <a
          href="https://jlcareglio.github.io/freecodecamp/"
          className="text-blue-400 underline hover:text-blue-300 transition-colors duration-300"
        >
          freeCodeCamp projects
        </a>
        <span
          className="new-tab-link"
          onClick={() =>
            window.open(
              'https://jlcareglio.github.io/freecodecamp/',
              '_blank',
              'noopener,noreferrer'
            )
          }
        >
          <sup>{'\u2197\uFE0E'}</sup>
        </span>
        .
      </p>
    </footer>
  );
};

export default Footer;
