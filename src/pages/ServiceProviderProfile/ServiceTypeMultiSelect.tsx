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
    <div>
      <h3 className="text-lg font-semibold mb-2">{categoryName}</h3>
      <label className="text-gray-700 font-medium">Select Service Types</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`px-3 py-1 border rounded ${selectedIds.includes(type.id) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => handleSelect(type.id)}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeMultiSelect;
