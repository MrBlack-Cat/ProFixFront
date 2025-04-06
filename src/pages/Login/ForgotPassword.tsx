import { motion } from 'framer-motion';

const ForgotPassword = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.7, duration: 0.5 }}
    className="mt-4 text-center"
  >
    <a href="#forgot-password" className="text-blue-600 hover:text-blue-800 transition">
      Forgot Password?
    </a>
  </motion.div>
);

export default ForgotPassword;
