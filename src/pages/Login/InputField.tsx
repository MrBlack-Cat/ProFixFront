import { motion } from 'framer-motion';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField = ({ label, type, value, onChange, placeholder }: InputFieldProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.5 }}
    className="relative w-full"
  >
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder} 
      className="peer w-full p-4 pt-6 bg-white/20 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-transparent"
    />
    <label
      className="absolute top-1 left-3 text-white/70 text-xs transition-all duration-300 ease-in-out peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-1 peer-focus:text-xs peer-focus:text-pink-400"
    >
      {label}
    </label>
  </motion.div>
);

export default InputField;
