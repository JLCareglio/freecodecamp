import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 pb-6 bg-gradient-to-b from-transparent to-gray-900/10 rounded-t-3xl">
      <p className="text-gray-400 font-medium">
        Construido con <span className="animate-pulse">❤️</span> usando React,
        TypeScript y Tailwind CSS + marked.js & lucide-react
      </p>
      <p className="text-gray-400 my-2 font-medium">
        👨‍💻 Dev: Jesús Lautaro Careglio Albornoz
      </p>
      <p className="text-gray-400 font-medium">
        {"👀 Mira el "}
        <>
          <a
            href="https://github.com/JLCareglio/freecodecamp/tree/main/Markdown-Previewer/_Markdown-Previewer"
            className="text-blue-400 underline hover:text-blue-300 transition-colors duration-300"
          >
            codigo fuente
          </a>
          <a
            href="https://github.com/JLCareglio/freecodecamp/tree/main/Markdown-Previewer/_Markdown-Previewer"
            className="inline-flex items-center justify-center w-5 h-5 font-bold no-underline leading-none p-[0.1em_0.2em_0.1em_0.15em] text-blue-400 hover:text-blue-300 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir en nueva pestaña"
          >
            ↗
          </a>
        </>
        {" y tambien el resto de "}
        <>
          <a
            href="https://jlcareglio.github.io/freecodecamp/"
            className="text-blue-400 underline hover:text-blue-300 transition-colors duration-300"
          >
            mis proyectos de freeCodeCamp
          </a>
          <a
            href="https://jlcareglio.github.io/freecodecamp/"
            className="inline-flex items-center justify-center w-5 h-5 font-bold no-underline leading-none p-[0.1em_0.2em_0.1em_0.15em] text-blue-400 hover:text-blue-300 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir en nueva pestaña"
          >
            ↗
          </a>
        </>
      </p>
    </footer>
  );
};

export default Footer;
