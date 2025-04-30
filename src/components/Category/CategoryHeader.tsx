import { Category } from '../../types/category';
import { motion } from 'framer-motion';

interface Props {
  category: Category;
}

const CategoryHeader = ({ category }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl"
    >
      <div className="text-6xl mb-4">{category.icon}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#122E34]">{category.name}</h1>
      <p className="text-sm md:text-base text-gray-700">
        Browse top-rated professionals in the{' '}
        <span className="font-semibold text-cyan-700">{category.name}</span> category. Select your service and get started today!
      </p>
    </motion.div>
  );
};

export default CategoryHeader;
