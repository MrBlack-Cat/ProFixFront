import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}

const ClientInputField = ({ label, name, value, onChange, placeholder = "", error, type = "text" }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative w-full mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder || " "}
        className={`peer w-full p-4 pt-6 bg-white/20 text-white border ${
          error ? "border-red-400" : isFocused || value ? "border-pink-400" : "border-white/30"
        } rounded-lg focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-400" : "focus:ring-pink-400"
        } placeholder-transparent transition-all`}
      />

      <label
        htmlFor={name}
        className={`absolute left-4 transition-all ${
          isFocused || value ? "top-2 text-xs text-pink-400" : "top-4 text-base text-white/50"
        } peer-placeholder-shown:text-white/50`}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-400 text-xs mt-1 pl-1 transition-all">{error}</p>
      )}
    </motion.div>
  );
};

export default ClientInputField;
