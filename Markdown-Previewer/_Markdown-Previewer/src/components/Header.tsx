import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Previsualizador de Markdown
        </h1>
      </div>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Escribe tu Markdown en el editor y ve la hermosa vista previa HTML en tiempo real
      </p>
    </header>
  );
};

export default Header;