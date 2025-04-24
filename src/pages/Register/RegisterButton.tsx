import { motion } from 'framer-motion';

interface Props {
  loading: boolean;
}

const RegisterButton = ({ loading }: Props) => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    disabled={loading}
    className="w-full py-3 bg-gradient-to-r from-purple-500 to-emerald-900 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all"
  >
    {loading ? 'Registering...' : 'Register'}
  </motion.button>
);

export default RegisterButton;
