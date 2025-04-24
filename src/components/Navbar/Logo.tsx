import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="cursor-pointer text-2xl font-bold text-cyan-400"
    >
      ProFix
    </motion.div>
  );
};

export default Logo;
