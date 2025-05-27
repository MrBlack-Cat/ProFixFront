import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

type Category = {
  id: number;
  name: string;
};

type Props = {
  value: number;
  onChange: (id: number, name: string) => void;
};

const CategorySelector = ({ value, onChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('https://localhost:7164/api/ParentCategory', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.isSuccess) setCategories(result.data);
    };

    fetchCategories();
  }, []);

  const selectedCategory = categories.find((c) => c.id === value);

  const handleSelect = (id: number) => {
    const name = categories.find(c => c.id === id)?.name || '';
    onChange(id, name);
    setOpen(false);
  };

  return (
    <div className="relative w-full mb-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-white/20 border border-white/30 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      >
        <span>{selectedCategory?.name || 'Select Category'}</span>
        <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg"
          >
            {categories.map((cat) => (
              <motion.li
                key={cat.id}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className={`p-3 cursor-pointer transition ${
                  cat.id === value ? 'bg-pink-500/30' : ''
                }`}
                onClick={() => handleSelect(cat.id)}
              >
                {cat.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelector;
