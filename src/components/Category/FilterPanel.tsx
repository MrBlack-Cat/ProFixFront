import { useEffect, useState } from 'react';
import { ServiceProvider } from '../../types/category';

interface Props {
  providers: ServiceProvider[];
  onFilter: (filtered: ServiceProvider[]) => void;
}

const FilterPanel = ({ providers, onFilter }: Props) => {
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCities = Array.from(new Set(providers.map(p => p.city))).sort();
    setAvailableCities(uniqueCities);
  }, [providers]);

  useEffect(() => {
    let result = [...providers];

    if (city) {
      result = result.filter(p => p.city === city);
    }

    if (experience) {
      const years = parseInt(experience);
      result = result.filter(p => p.experienceYears >= years);
    }

    onFilter(result);
  }, [city, experience, providers]);

  return (
    <div className="w-full md:w-1/4 bg-white p-4 rounded-xl shadow-md h-fit">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by</h3>

      {/* City */}
      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      >
        <option value="">All</option>
        {availableCities.map((c, idx) => (
          <option key={idx} value={c}>
            {c}
          </option>
        ))}
      </select>

 
      <label className="block text-sm font-medium text-gray-700 mb-1">Min Experience</label>
      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Any</option>
        <option value="1">1+ years</option>
        <option value="3">3+ years</option>
        <option value="5">5+ years</option>
      </select>
    </div>
  );
};

export default FilterPanel;
