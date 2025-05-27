import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaTools, FaChevronDown } from 'react-icons/fa';
import { FC } from 'react'; 

interface RoleOption {
  id: number;
  label: string;
  icon: React.ReactNode;  
}

const roles: RoleOption[] = [
  { id: 2, label: 'Client', icon: <FaUser /> },
  { id: 3, label: 'Service Provider', icon: <FaTools /> },
];

interface Props {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | { target: { value: number } }) => void;
}

const RoleSelect: FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const selectedRole = roles.find((r) => r.id === value);

  const handleSelect = (roleId: number) => {
    onChange({ target: { value: roleId } });
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-white/20 border border-white/30 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      >
        <span className="flex items-center gap-2">
          {selectedRole?.icon}
          {selectedRole?.label || 'Select Role'}
        </span>
        <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg overflow-hidden"
          >
            {roles.map((role) => (
              <motion.li
                key={role.id}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className={`flex items-center gap-3 p-3 cursor-pointer transition ${
                  role.id === value ? 'bg-pink-500/30' : ''
                }`}
                onClick={() => handleSelect(role.id)}
              >
                {role.icon}
                {role.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleSelect;
