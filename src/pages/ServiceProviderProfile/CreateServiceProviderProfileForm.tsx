import { useState } from 'react';
import ServiceInputField from './ServiceProviderInputField';
import ServiceSubmitButton from './ServiceProviderSubmitButton';
import CategorySelector from './CategorySelector';
import ServiceTypeMultiSelect from './ServiceTypeMultiSelect';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CreateServiceProfileForm = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    city: '',
    age: 0,
    genderId: 1,
    experienceYears: 0,
    avatar: null as File | null,
  });

  const [parentCategoryId, setParentCategoryId] = useState(0);
  const [parentCategoryName, setParentCategoryName] = useState('');
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'avatar' && files) {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: ['age', 'experienceYears', 'genderId'].includes(name) ? Number(value) : value });
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.surname) newErrors.surname = 'Surname is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.age) newErrors.age = 'Age is required';
    if (!form.experienceYears) newErrors.experienceYears = 'Experience is required';
    if (!parentCategoryId) newErrors.parentCategoryId = 'Category is required';
    if (selectedTypeIds.length === 0) newErrors.serviceTypes = 'Select at least one service type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Unauthorized');

      let avatarUrl: string | undefined = undefined;

      if (form.avatar) {
        const formData = new FormData();
        formData.append('file', form.avatar);

        const avatarRes = await fetch('https://localhost:7164/api/FileUpload/upload-service-avatar', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const avatarData = await avatarRes.json();
        if (!avatarRes.ok || !avatarData.isSuccess) {
          throw new Error(avatarData.errors?.[0] || 'Avatar upload failed');
        }

        avatarUrl = avatarData.data.url;
      }

      const payload = {
        ...form,
        parentCategoryId,
        serviceTypeIds: selectedTypeIds,
        avatarUrl,
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
      if (!res.ok || !result.isSuccess) {
        throw new Error(result.errors?.[0] || 'Profile creation failed');
      }

      navigate('/service-profile');
    } catch (err: any) {
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-1"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <ServiceInputField label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
        <ServiceInputField label="Surname" name="surname" value={form.surname} onChange={handleChange} error={errors.surname} />
        <ServiceInputField label="Age" name="age" type="number" value={form.age.toString()} onChange={handleChange} error={errors.age} />
        <ServiceInputField label="Experience Years" name="experienceYears" type="number" value={form.experienceYears.toString()} onChange={handleChange} error={errors.experienceYears} />
        <ServiceInputField label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} />
        
        <div>
          <select
            name="genderId"
            value={form.genderId}
            onChange={handleChange}
            className="w-full mt-1 p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-400"
          >
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
          <label className="text-white font-semibold">Gender</label>

        </div>
      </div>

      {/* Load avatar */}
      <div>
        <label className="text-white font-semibold">Upload Avatar </label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="w-48 mt-1 p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategorySelector value={parentCategoryId} onChange={(id, name) => { setParentCategoryId(id); setParentCategoryName(name); }} />
        
        {parentCategoryId > 0 && (
          <ServiceTypeMultiSelect
            categoryId={parentCategoryId}
            categoryName={parentCategoryName}
            selectedIds={selectedTypeIds}
            onChange={setSelectedTypeIds}
          />
        )}
      </div>

      <ServiceSubmitButton loading={loading} />
    </motion.form>
  );
};

export default CreateServiceProfileForm;
