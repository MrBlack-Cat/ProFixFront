import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); 

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 py-0.1 px-8 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 shadow-xl"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />

        <DesktopMenu /> 

        <AccountMenu
          accountMenuOpen={accountMenuOpen}
          setAccountMenuOpen={setAccountMenuOpen}
        /> 

        <motion.div
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="text-white w-8 h-8" />
            ) : (
              <Menu className="text-white w-8 h-8" />
            )}
          </button>
        </motion.div>
      </div>

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </motion.nav>
  );
};

export default Navbar;

