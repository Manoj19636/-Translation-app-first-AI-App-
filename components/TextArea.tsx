
import React from 'react';

interface TextAreaProps {
  id: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  readOnly?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ id, value, onChange, placeholder, readOnly = false }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full h-48 p-4 bg-slate-700 border-2 border-slate-600 rounded-xl text-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-300 ${readOnly ? 'cursor-default placeholder-slate-400' : 'placeholder-slate-500'}`}
    />
  );
};

export default TextArea;
