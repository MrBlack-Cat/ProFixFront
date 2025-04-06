import { motion } from 'framer-motion';

const SignUpLink = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="mt-4 text-center"
  >
    <p className="text-gray-600">
      Don't have an account?{' '}
      <a href="#register" className="text-blue-600 hover:text-blue-800 transition">
        Sign up here
      </a>
    </p>
  </motion.div>
);

export default SignUpLink;
