import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="cursor-pointer"
    >
      <img
        src="/icons/logo3.png"
        alt="ProFix Logo"
        className="h-32 w-auto" 
      />
    </motion.div>
  );
};

export default Logo;
