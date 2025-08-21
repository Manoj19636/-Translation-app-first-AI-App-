
import React from 'react';

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-slate-700 hover:bg-cyan-600 text-slate-300 hover:text-white rounded-full p-3 shadow-md transition-all duration-300 ease-in-out transform hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      aria-label="Swap languages"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </button>
  );
};

export default SwapButton;
