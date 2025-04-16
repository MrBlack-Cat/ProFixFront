import { useState } from 'react';
import ClientInputField from './ClientInputField';
import ClientSubmitButton from './ClientSubmitButton';

interface Props {
  onSubmit: (formData: FormData) => void;
  loading: boolean;
}

export interface FormData {
  name: string;
  surname: string;
  city: string;
  avatar: File | null;
  about: string;
  otherContactLinks: string;
}

const CreateClientProfileForm = ({ onSubmit, loading }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    city: '',
    avatar: null,
    about: '',
    otherContactLinks: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.surname) newErrors.surname = 'Surname is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.avatar) newErrors.avatar = 'Avatar image is required';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ClientInputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter your name"
      />
      <ClientInputField
        label="Surname"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        error={errors.surname}
        placeholder="Enter your surname"
      />
      <ClientInputField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        error={errors.city}
        placeholder="Your city"
      />

    <div>
      <label htmlFor="avatar">Avatar Photo</label>
      <input
        type="file"
        name="avatar"
        id="avatar"
        accept="image/*"
        onChange={handleChange}
        required
      />
      {errors.avatar && <p className="text-red-500">{errors.avatar}</p>}
    </div>


      <ClientInputField
        label="About"
        name="about"
        value={formData.about}
        onChange={handleChange}
        placeholder="Tell something about yourself"
      />
      <ClientInputField
        label="Other Contact Links"
        name="otherContactLinks"
        value={formData.otherContactLinks}
        onChange={handleChange}
        placeholder="Telegram, LinkedIn etc."
      />

      <ClientSubmitButton text={loading ? 'Saving...' : 'Create Profile'} disabled={loading} />
    </form>
  );
};

export default CreateClientProfileForm;
