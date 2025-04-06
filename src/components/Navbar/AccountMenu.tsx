import { motion } from 'framer-motion';


interface AccountMenuProps {
    accountMenuOpen: boolean;
    setAccountMenuOpen: (value: boolean) => void;
  }
  
  const AccountMenu = ({ accountMenuOpen, setAccountMenuOpen }: AccountMenuProps) => {  const handleAccountClick = () => {
    setAccountMenuOpen(!accountMenuOpen); // Open Close Menu
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={handleAccountClick}
        className="text-white m-1 text-lg px-2 py-1 bg-transparent border-2 border-white rounded-md hover:bg-white hover:text-blue-700 transition-all duration-300"
      >
        My Account
      </button>

      {/* Menu */}
      {accountMenuOpen && (
        <motion.div
          className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-48 p-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <a href="/login" className="block text-blue-600 hover:text-blue-800">
            Login
          </a>
          <a href="#logout" className="block text-blue-600 hover:text-blue-800">
            Logout
          </a>
          <a href="/register" className="block text-blue-600 hover:text-blue-800">
            Register
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AccountMenu;
