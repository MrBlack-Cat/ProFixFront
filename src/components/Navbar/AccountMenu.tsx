import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';

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
      console.warn('❌ Ошибка при декодировании токена:', error);
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
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      ref={menuRef}
    >
      <button
        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        className="text-white m-1 text-lg px-2 py-1 bg-transparent border-2 border-white rounded-md hover:bg-white hover:text-blue-700 transition-all duration-300"
      >
        My Account
      </button>

      {accountMenuOpen && (
        <motion.div
          className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-48 p-4 space-y-2 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfileRedirect}
                className="block w-full text-left text-blue-600 hover:text-blue-800"
              >
                My ProFix
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
                className="w-full text-left text-blue-600 hover:text-blue-800"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="block text-blue-600 hover:text-blue-800">
                Login
              </a>
              <a href="/register" className="block text-blue-600 hover:text-blue-800">
                Register
              </a>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AccountMenu;
