import { useState } from 'react';

interface Props {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
}

const ServiceInputField = ({ label, name, type = 'text', value, onChange, error }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full mb-3">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        className={`peer w-full p-3 pt-5 bg-white/20 border ${
          error ? 'border-red-400' : isFocused || value ? 'border-pink-400' : 'border-white/30'
        } text-white rounded-lg focus:outline-none focus:ring-2 ${
          error ? 'focus:ring-red-400' : 'focus:ring-pink-400'
        } placeholder-transparent transition-all`}
      />

      <label
        htmlFor={name}
        className={`absolute left-3 transition-all ${
          isFocused || value
            ? 'top-1 text-xs text-pink-400'
            : 'top-4 text-base text-white/50'
        } peer-placeholder-shown:text-white/50`}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-400 text-xs mt-1 pl-1 transition-all">{error}</p>
      )}
    </div>
  );
};

export default ServiceInputField;
