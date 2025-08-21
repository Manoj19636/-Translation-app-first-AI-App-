
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
        Gemini AI Translator
      </h1>
      <p className="text-slate-400 mt-2">Translate words and sentences with the power of AI.</p>
    </header>
  );
};

export default Header;
