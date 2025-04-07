import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface ServiceProviderProfile {
  id: number;
  userId: number;
  name: string;
  surname: string;
  city?: string;
  age?: number;
  genderName?: string;
  experienceYears?: number;
  description?: string;
  avatarUrl?: string;
  parentCategoryName?: string;
  serviceTypes: string[];
  isApprovedByAdmin: boolean;
  approvalDate?: string;
  createdAt: string;
}

const OverviewTab: React.FC = () => {
  const [profile, setProfile] = useState<ServiceProviderProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      const res = await fetchWithAuth('https://localhost:7164/api/ServiceProviderProfile/user');
      const data = await res.json();
      setProfile(data.data);
    } catch (err) {
      setError('Something went wrong 😢');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center text-blue-600">Loading profile... ⏳</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!profile) return <div className="text-center text-gray-500">No profile found.</div>;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto text-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-center">👤 Service Provider Overview</h2>

      <div className="space-y-2">
        <p><strong>Name:</strong> {profile.name} {profile.surname}</p>
        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Gender:</strong> {profile.genderName}</p>
        <p><strong>Experience:</strong> {profile.experienceYears} years</p>
        <p><strong>Category:</strong> {profile.parentCategoryName}</p>
        <p><strong>Service Types:</strong> {profile.serviceTypes.join(', ')}</p>
        <p><strong>Created At:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        <p>
          <strong>Verification:</strong>{' '}
          {profile.isApprovedByAdmin
            ? <span className="text-green-600 font-medium">✅ Approved</span>
            : <span className="text-yellow-600 font-medium">⏳ Pending</span>}
        </p>
      </div>
    </div>
  );
};

export default OverviewTab;
