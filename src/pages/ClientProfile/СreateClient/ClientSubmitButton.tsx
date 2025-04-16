import { motion } from "framer-motion";

interface Props {
  text?: string;
  disabled?: boolean;
}

const ClientSubmitButton = ({ text = "Submit", disabled = false }: Props) => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={disabled}
    className={`w-full p-3 text-white rounded-xl text-lg transition-all duration-300 ${
      disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {text}
  </motion.button>
);

export default ClientSubmitButton;
