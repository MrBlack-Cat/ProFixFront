import React, { useEffect, useState } from 'react';
import { ServiceProvider } from '../../types/category';
import GlassModal from '../../components/Glassmorphism/GlassModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  providers: ServiceProvider[];
  onApply: (filtered: ServiceProvider[]) => void;
}

const FilterModal: React.FC<Props> = ({ isOpen, onClose, providers, onApply }) => {
  const [city, setCity] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minExp, setMinExp] = useState('');
  const [minRating, setMinRating] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);

  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableServiceTypes, setAvailableServiceTypes] = useState<string[]>([]);

  useEffect(() => {
    const cities = Array.from(new Set(providers.map(p => p.city).filter((x): x is string => typeof x === 'string')));
    const categories = Array.from(new Set(providers.map(p => p.parentCategoryName).filter((x): x is string => typeof x === 'string')));

    setAvailableCities(cities);
    setAvailableCategories(categories);
  }, [providers]);

  useEffect(() => {
    if (!category) {
      setAvailableServiceTypes([]);
      setSelectedServiceTypes([]);
      return;
    }

    const serviceTypesSet = new Set<string>();

    providers
      .filter(p => p.parentCategoryName?.toLowerCase() === category.toLowerCase())
      .forEach(p => p.serviceTypes?.forEach(type => {
        if (type) serviceTypesSet.add(type);
      }));

    setAvailableServiceTypes(Array.from(serviceTypesSet));
    setSelectedServiceTypes([]);
  }, [category, providers]);

  const applyFilters = () => {
    let result = [...providers];

    if (city) result = result.filter(p => p.city?.toLowerCase() === city.toLowerCase());
    if (gender) result = result.filter(p => (p.genderName ?? '').toLowerCase().includes(gender.toLowerCase()));
    if (minAge) result = result.filter(p => typeof p.age === 'number' && p.age >= Number(minAge));
    if (maxAge) result = result.filter(p => typeof p.age === 'number' && p.age <= Number(maxAge));
    if (minExp) result = result.filter(p => typeof p.experienceYears === 'number' && p.experienceYears >= Number(minExp));
    if (minRating) result = result.filter(p => typeof p.rating === 'number' && p.rating >= Number(minRating));
    if (category) result = result.filter(p => p.parentCategoryName?.toLowerCase() === category.toLowerCase());

    if (selectedServiceTypes.length > 0) {
      result = result.filter(p =>
        selectedServiceTypes.every(type => (p.serviceTypes || []).includes(type))
      );
    }

    onApply(result);
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center text-white">Filter Providers</h2>

        {/* City */}
        <div>
          <label className="font-semibold">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">All Cities</option>
            {availableCities.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="font-semibold">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Age */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-semibold">Min Age</label>
            <input
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Max Age</label>
            <input
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="font-semibold">Min Experience (years)</label>
          <input
            type="number"
            value={minExp}
            onChange={(e) => setMinExp(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="font-semibold">Min Rating (0–5)</label>
          <input
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Parent Category */}
        <div>
          <label className="font-semibold">Parent Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">All Categories</option>
            {availableCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Service Types */}
        {availableServiceTypes.length > 0 && (
          <div>
            <label className="font-semibold">Service Types</label>
            <div className="max-h-40 overflow-y-auto border rounded p-2 bg-white space-y-2">
                {availableServiceTypes.map((type) => (
                    <label
                    key={type}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                    <input
                        type="checkbox"
                        checked={selectedServiceTypes.includes(type)}
                        onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedServiceTypes((prev) =>
                            checked ? [...prev, type] : prev.filter((t) => t !== type)
                        );
                        }}
                    />
                    {type}
                    </label>
                ))}
                </div>

          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </GlassModal>
  );
};

export default FilterModal;
