import { motion } from "framer-motion";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }
  
  const InputField = ({ label, type, value, onChange, placeholder }: InputFieldProps) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <label className="text-gray-700 text-lg font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </motion.div>
  );
  
  export default InputField;
  