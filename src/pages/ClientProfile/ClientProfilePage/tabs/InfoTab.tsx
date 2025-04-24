import { useEffect, useState } from 'react';
import { ClientProfile } from '../../../../types/ClientProfile';

const InfoTab = () => {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('https://localhost:7164/api/ClientProfile/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.isSuccess && data.data) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error('❌ Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (!profile) {
    return <p className="text-red-400">Profile not found.</p>;
  }

  return (
    <div className="p-6 bg-white/50 backdrop-blur-md rounded-2xl shadow-md space-y-12">
      <div className="flex items-center space-x-6">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Avatar
          </div>
        )}
        <div>
          <h2 className="text-3xl font-bold text-indigo-800">
            {profile.name} {profile.surname}
          </h2>
          <p className="text-gray-600">{profile.city || 'City not specified'}</p>
        </div>
      </div>

      {profile.about && (
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">About</h3>
          <p className="text-gray-800">{profile.about}</p>
        </div>
      )}

      {profile.otherContactLinks && (
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Contact Links</h3>
          <p className="text-indigo-600">{profile.otherContactLinks}</p>
        </div>
      )}

      {profile.createdAt && (
        <div className="text-sm text-gray-500">
          Registered on: {new Date(profile.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default InfoTab;
