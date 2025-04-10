import { useEffect, useState } from 'react';

interface ClientProfile {
  name: string;
  surname: string;
  city?: string;
  avatarUrl?: string;
  about?: string;
  otherContactLinks?: string;
}

const InfoTab = () => {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('https://localhost:7164/api/ClientProfile/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.isSuccess) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!profile) {
    return <p className="text-red-500">Profile not found.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
        )}
        <div>
          <h2 className="text-xl font-bold">
            {profile.name} {profile.surname}
          </h2>
          <p className="text-gray-600">{profile.city}</p>
        </div>
      </div>

      {profile.about && (
        <div>
          <h3 className="text-lg font-semibold text-blue-600">About</h3>
          <p className="text-gray-800">{profile.about}</p>
        </div>
      )}

      {profile.otherContactLinks && (
        <div>
          <h3 className="text-lg font-semibold text-blue-600">Contact Links</h3>
          <p className="text-blue-700">{profile.otherContactLinks}</p>
        </div>
      )}
    </div>
  );
};

export default InfoTab;
