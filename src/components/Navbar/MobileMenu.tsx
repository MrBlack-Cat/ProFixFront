import { motion } from 'framer-motion';

interface MobileMenuProps {
    menuOpen: boolean;
    setMenuOpen: (value: boolean) => void;
  }
  
  const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => (
  <motion.div
    className={`absolute top-0 right-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 w-full h-full p-8 flex flex-col items-center space-y-6 transition-all duration-500 ease-in-out ${
      menuOpen ? 'block' : 'hidden'
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    <a
      href="#about"
      className="text-white text-2xl hover:text-yellow-300 transition-all duration-300"
      onClick={() => setMenuOpen(false)}
    >
      About
    </a>
    <a
      href="#services"
      className="text-white text-2xl hover:text-yellow-300 transition-all duration-300"
      onClick={() => setMenuOpen(false)}
    >
      Services
    </a>
    <a
      href="#contact"
      className="text-white text-2xl hover:text-yellow-300 transition-all duration-300"
      onClick={() => setMenuOpen(false)}
    >
      Contact
    </a>
    <button
      className="text-white text-2xl hover:text-yellow-300 transition-all duration-300"
      onClick={() => setMenuOpen(false)}
    >
      Sign In
    </button>
    <button
      className="text-white text-2xl hover:text-yellow-300 transition-all duration-300"
      onClick={() => setMenuOpen(false)}
    >
      Sign Up
    </button>
  </motion.div>
);

export default MobileMenu;
