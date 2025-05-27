import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import NotificationBell from '../Notification/NotificationBell';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../Common/LanguageSwitcher';


interface NavbarProps {
  isScrolled: boolean;
}


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showFullNavbar = !isScrolled || isHovered;

  return (
    <motion.nav
      className={`fixed top-[1%] z-50 rounded-3xl overflow-visible shadow-lg backdrop-blur-md border border-cyan-400/20 bg-black/20`}
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.3)' }} 
      transition={{ duration: 0.5 }}
      style={{
        left: '5%',
        right: showFullNavbar ? '5%' : '75%',
        height: showFullNavbar ? '60px' : '50px',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="relative w-full h-full flex items-center justify-between px-8 rounded-3xl">

        {/* Left */}
        <div className="flex items-center space-x-6 z-10">
          <button onClick={() => navigate('/')} className="focus:outline-none">
            <Logo />
          </button>

          {/* DesktopMenu itmesi */}
          <AnimatePresence>
            {showFullNavbar && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <DesktopMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>



        {/* Right */}
        <div className="flex items-center space-x-2 z-10">
          <LanguageSwitcher />
          <NotificationBell />
          <AccountMenu
            accountMenuOpen={accountMenuOpen}
            setAccountMenuOpen={setAccountMenuOpen}
          />
          <motion.div className="md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-400">
              {menuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
