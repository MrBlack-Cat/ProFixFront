import { useState, useEffect } from 'react';
import SettingsInputField from './SettingsInputField';
import SaveButton from './SaveButton';
import CategorySelector from './CategorySelector';
import ServiceTypeMultiSelect from './ServiceTypeMultiSelect';
import { getProfile, updateProfile } from '../../../../api/serviceProviderApi';

interface ServiceProviderProfile {
  name: string;
  surname: string;
  city: string;
  age: number;
  genderId: number;
  experienceYears: number;
  description?: string;
  isActive: boolean;
  serviceTypeIds: number[];
  parentCategoryId: number | null;
  avatarFile: File | null;
}

const SettingsForm = () => {
  const [formData, setFormData] = useState<ServiceProviderProfile>({
    name: '',
    surname: '',
    city: '',
    age: 0,
    genderId: 1,
    experienceYears: 0,
    description: '',
    isActive: true,
    serviceTypeIds: [],
    parentCategoryId: null,
    avatarFile: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        setFormData({
          ...data,
          description: data.description ?? '',
          isActive: typeof data.isActive === 'boolean' ? data.isActive : true,
          avatarFile: null,
        });
      } catch (error) {
        console.error('❌ Error loading profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, avatarFile: file }));
  };

  const handleServiceTypeChange = (ids: number[]) => {
    setFormData((prev) => ({ ...prev, serviceTypeIds: ids }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('surname', formData.surname);
      payload.append('city', formData.city);
      payload.append('age', String(formData.age));
      payload.append('genderId', String(formData.genderId));
      payload.append('experienceYears', String(formData.experienceYears));
      payload.append('isActive', String(formData.isActive ?? true));
      payload.append('parentCategoryId', formData.parentCategoryId !== null ? String(formData.parentCategoryId) : '');
      payload.append('description', formData.description ?? '');
      formData.serviceTypeIds.forEach(id => payload.append('serviceTypeIds', id.toString()));
      if (formData.avatarFile) payload.append('avatarFile', formData.avatarFile);

      await updateProfile(payload);
      alert('✅ Profile updated successfully!');
    } catch (error) {
      console.error('❌ Error updating profile', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl p-4 shadow-xl space-y-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SettingsInputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <SettingsInputField label="Surname" name="surname" value={formData.surname} onChange={handleInputChange} />
        <SettingsInputField label="City" name="city" value={formData.city} onChange={handleInputChange} />
        <SettingsInputField label="Age" name="age" type="number" value={formData.age} onChange={handleInputChange} />
        <SettingsInputField label="Experience (years)" name="experienceYears" type="number" value={formData.experienceYears} onChange={handleInputChange} />
        <SettingsInputField label="Description" name="description" value={formData.description || ''} onChange={handleInputChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-6">
        <CategorySelector
          selectedId={formData.parentCategoryId}
          onChange={(id) => setFormData(prev => ({ ...prev, parentCategoryId: id, serviceTypeIds: [] }))}
        />
        <ServiceTypeMultiSelect
          categoryId={formData.parentCategoryId}
          selected={formData.serviceTypeIds}
          onChange={handleServiceTypeChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Gender</label>
          <select
            name="genderId"
            value={formData.genderId}
            onChange={handleSelectChange}
            className="w-full p-3 bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl focus:ring focus:ring-blue-400 focus:border-blue-400 text-sm shadow-sm"
            disabled={loading}
          >
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
        </div>

        {/* Avatar Load */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Upload Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-white/30 backdrop-blur-md file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.avatarFile && (
            <p className="text-xs text-gray-500">{formData.avatarFile.name}</p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          disabled={loading}
          className="h-5 w-5 text-blue-600 focus:ring-blue-400"
        />
        <span className="text-sm text-gray-700">Active</span>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <SaveButton loading={loading} />
      </div>

      {loading && (
        <p className="text-center text-blue-500 animate-pulse mt-4">Saving changes...</p>
      )}
    </form>
  );
};

export default SettingsForm;
