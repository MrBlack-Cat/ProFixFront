import { useEffect, useState } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    const name = categories.find(c => c.id === id)?.name || '';
    onChange(id, name);
  };

  return (
    <div>
      <label className="text-gray-700 font-medium">Category</label>
      <select
        name="parentCategoryId"
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-1"
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
