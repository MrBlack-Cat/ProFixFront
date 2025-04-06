import { motion } from "framer-motion";

const DesktopMenu = () => (
    <motion.div
      className="hidden md:flex space-x-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <a
        href="#about"
        className="text-white hover:text-yellow-300 transition-all duration-300 hover:scale-105"
      >
        About
      </a>
      <a
        href="#services"
        className="text-white hover:text-yellow-300 transition-all duration-300 hover:scale-105"
      >
        Services
      </a>
      <a
        href="#contact"
        className="text-white hover:text-yellow-300 transition-all duration-0.3 hover:scale-105"
      >
        Contact
      </a>
    </motion.div>
  );
  
  export default DesktopMenu;
  