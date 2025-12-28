import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-zinc-400 mb-1.5">
        {label}
      </label>
      <input
        className={`
          w-full px-4 py-2.5 rounded-lg border bg-zinc-900 text-zinc-100 
          placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 
          transition-all duration-200
          ${error ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-brand-500'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;