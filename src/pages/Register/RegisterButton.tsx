import { motion } from 'framer-motion';

interface Props {
  loading: boolean;
}

const RegisterButton = ({ loading }: Props) => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={loading}
    className="w-full p-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
  >
    {loading ? 'Registering...' : 'Register'}
  </motion.button>
);

export default RegisterButton;
