import { Category } from '../../types/category';

interface Props {
  category: Category;
}

const CategoryHeader = ({ category }: Props) => {
  return (
    <div className="text-center bg-white p-6 rounded-xl shadow-md">
      <div className="text-5xl mb-2">{category.icon}</div>
      <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
      <p className="text-sm text-gray-500 mt-2">
        Browse top-rated professionals in <span className="font-semibold">{category.name}</span> category.  
        Select your service and get started today!
      </p>
    </div>
  );
};

export default CategoryHeader;
