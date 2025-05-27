import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
}

interface Props {
  selectedId: number | null;
  onChange: (id: number) => void;
}

const CategorySelector = ({ selectedId, onChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('https://localhost:7164/api/ParentCategory')
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  }, []);

  return (
    <div>
      <label className="block mb-1 font-medium">Category</label>
      <select
        className="w-full p-2 border rounded"
        value={selectedId ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="">-- Select Category --</option>
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
