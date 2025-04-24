import { motion } from 'framer-motion';

interface Props {
  text?: string;
  disabled?: boolean;
}

const ClientSubmitButton = ({ text = "Create Profile", disabled = false }: Props) => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={disabled}
    className="w-full py-3 bg-gradient-to-r from-purple-500 to-emerald-900 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all"
  >
    {disabled ? 'Saving...' : text}
  </motion.button>
);

export default ClientSubmitButton;
