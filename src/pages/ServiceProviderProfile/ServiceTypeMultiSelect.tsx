import { useEffect, useState } from 'react';

type Props = {
  categoryId: number;
  categoryName: string;
  selectedIds: number[];
  onChange: (ids: number[]) => void;
};

type ServiceType = {
  id: number;
  name: string;
};

const ServiceTypeMultiSelect = ({ categoryId, categoryName, selectedIds, onChange }: Props) => {
  const [types, setTypes] = useState<ServiceType[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`https://localhost:7164/api/ServiceType/by-category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data?.data) {
        setTypes(data.data);
      }
    };

    if (categoryId > 0) {
      fetchTypes();
    }
  }, [categoryId]);

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-white">{categoryName}</h3>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => handleSelect(type.id)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedIds.includes(type.id)
                ? 'bg-gradient-to-r from-pink-500 to-purple-700 text-white'
                : 'bg-white/20 text-white border border-white/30'
            } hover:scale-105`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeMultiSelect;
