import React, { useEffect, useState } from 'react';
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
  description?: string;
  experienceYears: number;
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
    isActive: true,
    serviceTypeIds: [],
    parentCategoryId: null,
    avatarFile: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        setFormData({
          ...data,
          avatarFile: null,
          description: data.description ?? '',

        });
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseInt(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
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
      const formToSend = new FormData();
      formToSend.append('name', formData.name);
      formToSend.append('surname', formData.surname);
      formToSend.append('city', formData.city);
      formToSend.append('age', String(formData.age));
      formToSend.append('genderId', String(formData.genderId));
      formToSend.append('experienceYears', String(formData.experienceYears));
      formToSend.append('isActive', String(formData.isActive));
      formToSend.append('parentCategoryId', String(formData.parentCategoryId ?? ''));
      formToSend.append('description', formData.description || '');
      formData.serviceTypeIds.forEach((id) => formToSend.append('serviceTypeIds', id.toString()));
      if (formData.avatarFile) {
        formToSend.append('avatarFile', formData.avatarFile);
      }

      await updateProfile(formToSend);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update failed', error);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SettingsInputField label="Name" name="name" value={formData.name} onChange={handleChange} />
      <SettingsInputField label="Surname" name="surname" value={formData.surname} onChange={handleChange} />
      <SettingsInputField label="City" name="city" value={formData.city} onChange={handleChange} />
      <SettingsInputField label="Age" name="age" value={formData.age} type="number" onChange={handleChange} />
      <SettingsInputField label="Experience (years)" name="experienceYears" value={formData.experienceYears} type="number" onChange={handleChange} />
      <SettingsInputField label="Description" name="description" value={formData.description || ''} onChange={handleChange} />

      <label className="block text-sm font-medium text-gray-700">Gender</label>
      <select name="genderId" value={formData.genderId} onChange={handleSelectChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
        <option value={1}>Male</option>
        <option value={2}>Female</option>
      </select>

      <CategorySelector
        selectedId={formData.parentCategoryId}
        onChange={(id: number) =>
            setFormData((prev) => ({
            ...prev,
            parentCategoryId: id,
            serviceTypeIds: [], 
            }))
        }
/>


      <ServiceTypeMultiSelect
        categoryId={formData.parentCategoryId}
        selected={formData.serviceTypeIds}
        onChange={handleServiceTypeChange}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        {formData.avatarFile && (
          <p className="text-xs text-gray-500 mt-1">{formData.avatarFile.name}</p>
        )}
      </div>

      <input
        type="checkbox"
        name="isActive"
        checked={!!formData.isActive}
        onChange={(e) =>
            setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
        }
        />


      <SaveButton />
      {loading && <p className="text-sm text-blue-600">Saving...</p>}
    </form>
  );
};

export default SettingsForm;
