
import React, { useState, useCallback } from 'react';
import { Language } from './types';
import { LANGUAGES } from './constants';
import { translateText } from './services/geminiService';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import TextArea from './components/TextArea';
import SwapButton from './components/SwapButton';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('es');
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSwapLanguages = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  }, [sourceLang, targetLang, inputText, outputText]);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputText('');

    try {
      const sourceLanguageName = LANGUAGES.find(l => l.code === sourceLang)?.name || 'auto-detect';
      const targetLanguageName = LANGUAGES.find(l => l.code === targetLang)?.name;

      if (!targetLanguageName) {
        throw new Error('Invalid target language selected.');
      }
      
      const translated = await translateText(inputText, sourceLanguageName, targetLanguageName);
      setOutputText(translated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, sourceLang, targetLang]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-4xl mx-auto mt-8 p-6 bg-slate-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 items-center relative">
          {/* Source Language Column */}
          <div className="flex flex-col space-y-4">
            <LanguageSelector
              id="source-lang"
              languages={LANGUAGES}
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            />
            <TextArea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text..."
            />
          </div>
          
          {/* Swap Button - Positioned in the middle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
             <SwapButton onClick={handleSwapLanguages} />
          </div>
           <div className="block md:hidden mx-auto">
             <SwapButton onClick={handleSwapLanguages} />
          </div>

          {/* Target Language Column */}
          <div className="flex flex-col space-y-4">
            <LanguageSelector
              id="target-lang"
              languages={LANGUAGES.filter(l => l.code !== 'auto')}
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            />
            <div className="relative h-full">
              <TextArea
                id="output-text"
                value={outputText}
                placeholder="Translation"
                readOnly
              />
              {isLoading && <LoadingSpinner />}
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className="w-full md:w-auto px-12 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-600/20 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-slate-500">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
