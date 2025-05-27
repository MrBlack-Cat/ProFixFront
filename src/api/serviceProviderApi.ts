import { fetchWithAuth } from '../utils/api';

export interface ServiceProviderProfile {
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

interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;
  errors: string[] | null;
}

export const getProfile = async (): Promise<ServiceProviderProfile & { id: number }> => {
  const res = await fetchWithAuth('https://localhost:7164/api/ServiceProviderProfile/user');

  if (!res.ok) {
    const text = await res.text();
    console.error('Error getting profile:', text);
    throw new Error('Failed to load profile');
  }

  const json: ApiResponse<any> = await res.json();

  if (!json.isSuccess) {
    console.error('API Error:', json.errors);
    throw new Error('Server error: ' + (json.errors?.join(', ') || 'Unknown error'));
  }

  return json.data;
};

export const updateProfile = async (formData: FormData): Promise<any> => {
  const currentProfile = await getProfile();
  const userId = currentProfile.id;

  const res = await fetchWithAuth(`https://localhost:7164/api/ServiceProviderProfile/${userId}`, {
    method: 'PUT',
    body: formData,
  });

  const contentType = res.headers.get('content-type');

  if (!res.ok) {
    const errorText = contentType?.includes('application/json')
      ? JSON.stringify(await res.json())
      : await res.text();

    console.error('Update error:', errorText);
    throw new Error(errorText || 'Failed to update profile');
  }

  const json: ApiResponse<any> = await res.json();

  if (!json.isSuccess) {
    console.error('API Error:', json.errors);
    throw new Error('Update failed: ' + (json.errors?.join(', ') || 'Unknown error'));
  }

  return json.data;
};
