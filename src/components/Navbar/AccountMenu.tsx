import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { User } from 'lucide-react'; 

interface AccountMenuProps {
  accountMenuOpen: boolean;
  setAccountMenuOpen: (value: boolean) => void;
}

interface JwtPayload {
  nameid: string;
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string | string[];
}

const AccountMenu = ({ accountMenuOpen, setAccountMenuOpen }: AccountMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const accessToken = localStorage.getItem('accessToken');
  let isLoggedIn = false;
  let role = '';

  if (accessToken) {
    try {
      const decoded: JwtPayload = jwtDecode(accessToken);
      const rawRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      role = Array.isArray(rawRole) ? rawRole[0] : rawRole;
      isLoggedIn = true;
    } catch (error) {
      console.warn('Error decoding token:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setAccountMenuOpen(false);
    }
  };

  useEffect(() => {
    if (accountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountMenuOpen]);

  const handleProfileRedirect = () => {
    if (role === 'Client') {
      window.location.href = '/client-profile';
    } else if (role === 'ServiceProvider') {
      window.location.href = '/service-profile';
    } else if (role === 'Admin') {
      window.location.href = '/admin-profile';
    } else {
      window.location.href = '/profile';
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-lg transition-all duration-300"
      >
        <User size={20} />
      </motion.button>

      {/* Menu */}
      <AnimatePresence>
        {accountMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-4 w-48 bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-4 flex flex-col space-y-2 z-50"
          >
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleProfileRedirect}
                  className="text-left text-sm text-blue-700 hover:text-blue-900 transition"
                >
                  My Profile
                </button>
                <button
                  onClick={() => (window.location.href = '/messages')}
                  className="text-left text-sm text-blue-700 hover:text-blue-900 transition"
                >
                  Messages
                </button>
                {/* Chat */}
                <button
                  onClick={() => (window.location.href = '/chat')}
                  className="text-left text-sm text-blue-700 hover:text-blue-900 transition"
                >
                  My Assistant
                </button>
                <button
                  onClick={() => {
                    if (role === 'Client') {
                      window.location.href = '/client-profile?tab=Settings';
                    } else if (role === 'ServiceProvider') {
                      window.location.href = '/service-profile?tab=Settings';
                    } else {
                      window.location.href = '/profile';
                    }
                  }}
                  className="text-left text-sm text-blue-700 hover:text-blue-900 transition"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-red-500 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-sm text-blue-700 hover:text-blue-900 transition">
                  Login
                </a>
                <a href="/register" className="text-sm text-blue-700 hover:text-blue-900 transition">
                  Register
                </a>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountMenu;
