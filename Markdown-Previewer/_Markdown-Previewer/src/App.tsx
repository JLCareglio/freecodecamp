import React, { useState } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Footer from './components/Footer';
import { convertMarkdownToHtml, defaultMarkdown } from './utils/markdown';
import './styles/markdown-preview.css';

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="container mx-auto px-4 py-6">
        <Header />

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Editor value={markdown} onChange={handleInputChange} />
          <Preview htmlContent={convertMarkdownToHtml(markdown)} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;