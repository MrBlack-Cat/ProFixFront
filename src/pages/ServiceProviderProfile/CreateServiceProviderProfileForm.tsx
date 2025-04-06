import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceInputField from './ServiceProviderInputField';
import ServiceSubmitButton from './ServiceProviderSubmitButton';
import CategorySelector from './CategorySelector';
import ServiceTypeMultiSelect from './ServiceTypeMultiSelect';

const CreateServiceProfileForm = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    city: '',
    age: 0,
    genderId: 1,
    experienceYears: 0
  });

  const [parentCategoryId, setParentCategoryId] = useState(0);
  const [parentCategoryName, setParentCategoryName] = useState('');
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: ['age', 'experienceYears', 'genderId'].includes(name) ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const payload = {
        ...form,
        parentCategoryId,
        serviceTypeIds: selectedTypeIds
      };

      const res = await fetch('https://localhost:7164/api/ServiceProviderProfile/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.isSuccess) {
        throw new Error(result.errors?.[0] || 'Failed to create profile');
      }

      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <ServiceInputField label="Name" name="name" value={form.name} onChange={handleChange} />
      <ServiceInputField label="Surname" name="surname" value={form.surname} onChange={handleChange} />
      <ServiceInputField label="City" name="city" value={form.city} onChange={handleChange} />
      <ServiceInputField label="Age" name="age" type="number" value={form.age.toString()} onChange={handleChange} />
      <ServiceInputField label="Experience (years)" name="experienceYears" type="number" value={form.experienceYears.toString()} onChange={handleChange} />
      <div>
        <label className="text-gray-700 font-medium">Gender</label>
        <select name="genderId" value={form.genderId} onChange={handleChange} className="w-full p-2 border rounded mt-1">
          <option value={1}>Male</option>
          <option value={2}>Female</option>
        </select>
      </div>

      <CategorySelector value={parentCategoryId} onChange={(id, name) => { setParentCategoryId(id); setParentCategoryName(name); }} />
      {parentCategoryId > 0 && (
        <ServiceTypeMultiSelect
          categoryId={parentCategoryId}
          categoryName={parentCategoryName}
          selectedIds={selectedTypeIds}
          onChange={setSelectedTypeIds}
        />
      )}

      <ServiceSubmitButton loading={loading} />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};

export default CreateServiceProfileForm;
