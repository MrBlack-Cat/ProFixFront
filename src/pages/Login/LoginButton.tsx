import { motion } from 'framer-motion';

const LoginButton = () => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full p-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition-all duration-300"
  >
    Login
  </motion.button>
);

export default LoginButton;
