import { motion } from 'framer-motion';

interface Props {
  loading: boolean;
}

const LoginButton = ({ loading }: Props) => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={loading}
    className="w-full py-3 bg-gradient-to-r from-purple-500 to-emerald-900 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
  >
    {loading ? 'Logging in...' : 'Login'}
  </motion.button>
);

export default LoginButton;
