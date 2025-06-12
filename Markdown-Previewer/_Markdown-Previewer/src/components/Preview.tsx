import React from 'react';
import { Eye } from 'lucide-react';

interface PreviewProps {
  htmlContent: string;
}

const Preview: React.FC<PreviewProps> = ({ htmlContent }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-sm">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-white" />
          <h2 className="text-white font-semibold text-lg">Vista Previa en Vivo</h2>
        </div>
      </div>
      <div className="h-[600px] overflow-y-auto bg-gray-900">
        <div
          id="preview"
          className="p-6 text-gray-100 markdown-preview"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default Preview;