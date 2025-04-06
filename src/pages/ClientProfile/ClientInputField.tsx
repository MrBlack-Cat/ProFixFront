import { motion } from "framer-motion";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const ClientInputField = ({ label, name, value, onChange, placeholder, error }: Props) => (
  <motion.div
    className="mb-4"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${
        error ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </motion.div>
);

export default ClientInputField;
