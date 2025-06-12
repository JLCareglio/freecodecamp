import React from 'react';
import { Code2 } from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-sm">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-white" />
          <h2 className="text-white font-semibold text-lg">Editor de Markdown</h2>
        </div>
      </div>
      <div className="p-0">
        <textarea
          id="editor"
          value={value}
          onChange={onChange}
          className="w-full h-[600px] p-6 font-mono text-sm leading-relaxed border-none resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-gray-100 placeholder-gray-500"
          placeholder="Comienza a escribir tu Markdown aquí..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default Editor;