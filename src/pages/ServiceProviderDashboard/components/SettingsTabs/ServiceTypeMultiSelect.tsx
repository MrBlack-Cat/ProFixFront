import { useState, useEffect } from 'react';

interface ServiceType {
    id: number;
    name: string;
  }
  
  interface Props {
    categoryId: number | null;
    selected: number[]; // 🔥 обязательно массив, иначе fallback
    onChange: (ids: number[]) => void;
  }
  
  const ServiceTypeMultiSelect = ({ categoryId, selected = [], onChange }: Props) => {
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  
    useEffect(() => {
      if (!categoryId) return;
  
      fetch(`https://localhost:7164/api/ServiceType/by-category/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('📦 Service types loaded:', data);
          setServiceTypes(data.data || []);
        })
        .catch((err) => {
          console.error('❌ Error loading service types', err);
          setServiceTypes([]);
        });
    }, [categoryId]);
  
    const handleToggle = (id: number) => {
      const updated = selected.includes(id)
        ? selected.filter((i) => i !== id)
        : [...selected, id];
      onChange(updated);
    };
  
    return (
      <div>
        <label className="block mb-1 font-medium">Service Types</label>
        {serviceTypes.length === 0 && (
          <p className="text-sm text-gray-400">No service types available</p>
        )}
        <div className="flex flex-wrap gap-2">
          {serviceTypes.map((type) => (
            <label
              key={type.id}
              className={`px-3 py-1 border rounded cursor-pointer ${
                selected?.includes(type.id) ? 'bg-blue-600 text-white' : 'bg-white text-black'
              }`}
            >
              <input
                type="checkbox"
                checked={selected?.includes(type.id)}
                onChange={() => handleToggle(type.id)}
                className="hidden"
              />
              {type.name}
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default ServiceTypeMultiSelect;