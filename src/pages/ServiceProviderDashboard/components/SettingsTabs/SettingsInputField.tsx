import React, { useState } from 'react';

interface Props {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
}

const SettingsInputField = ({ label, name, value, onChange, type = 'text' }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const safeValue =
    type === 'number'
      ? value === null || value === undefined || isNaN(Number(value))
        ? ''
        : value
      : value ?? '';

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type}
        value={safeValue}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer w-full p-4 pt-4 text-sm bg-white/50 backdrop-blur-md border border-gray-300 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 top-1 text-sm text-purple-500 transition-all pointer-events-none
          ${isFocused || safeValue ? 'text-xs top-0.5 text-blue-500' : 'text-sm top-4'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default SettingsInputField;
