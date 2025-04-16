import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import NotificationBell from '../Notification/NotificationBell';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); 
  const navigate = useNavigate();

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 py-2 px-6 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 shadow-xl"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT: Logo + DesktopMenu */}
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/')} className="focus:outline-none">
            <Logo />
          </button>
          <DesktopMenu />
        </div>

        {/* RIGHT: Account + Bell + MobileMenuToggle */}
        <div className="flex items-center space-x-4">
          <AccountMenu
            accountMenuOpen={accountMenuOpen}
            setAccountMenuOpen={setAccountMenuOpen}
          />
          <NotificationBell />

          {/* MobileMenuToggle */}
          <motion.div className="md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="text-white w-8 h-8" />
              ) : (
                <Menu className="text-white w-8 h-8" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </motion.nav>
  );
};

export default Navbar;
