import { useState } from 'react';

interface Props {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const RegisterInput = ({ type, value, onChange, placeholder, required = true }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const validate = (value: string) => {
    if (!required) return '';
    if (value.trim() === '') return 'This field is required';
    if (type === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return 'Invalid email format';
    return '';
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTouched(true);
    setError(validate(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (touched) {
      setError(validate(e.target.value));
    }
  };

  return (
    <div className="relative w-full mb-6">
      {/* imput */}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder=" "
        className={`peer w-full p-3 pt-5 bg-white/20 border ${
          error ? 'border-red-400' : isFocused || value ? 'border-pink-400' : 'border-white/30'
        } text-white rounded-lg focus:outline-none focus:ring-2 ${
          error ? 'focus:ring-red-400' : 'focus:ring-pink-400'
        } placeholder-transparent transition-all`}
      />

      <label
        className={`absolute left-3 transition-all ${
          isFocused || value ? 'top-1 text-xs text-pink-400' : 'top-4 text-base text-white/50'
        } peer-placeholder-shown:text-white/50`}
      >
        {placeholder}
      </label>

      {/* error */}
      {touched && error && (
        <p className="text-red-400 text-xs mt-1 pl-1 transition-all">{error}</p>
      )}
    </div>
  );
};

export default RegisterInput;
