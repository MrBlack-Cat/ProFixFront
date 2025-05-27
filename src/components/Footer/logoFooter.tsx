import { motion } from 'framer-motion';

const logoFooter = () => {
  return (
    <motion.div
      whileHover={{ scale: 3.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="cursor-pointer"
    >
      <img
        src="/icons/logofooter.png"
        alt="ProFix Logo"
        className="h-6 w-auto" 
      />
    </motion.div>
  );
};

export default logoFooter;
