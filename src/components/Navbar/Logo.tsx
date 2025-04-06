import { motion } from "framer-motion";

const Logo = () => (
    <motion.div
      className="text-2xl font-bold text-white animate-pulse"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      ProFix
    </motion.div>
  );
  
  export default Logo;
  