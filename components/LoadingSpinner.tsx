
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-700 bg-opacity-50 rounded-xl">
      <div className="w-12 h-12 border-4 border-t-cyan-500 border-r-cyan-500 border-b-cyan-500 border-l-slate-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
