import { useEffect, useState } from 'react';
import { ClientProfile } from '../../../../types/ClientProfile';
import { fetchWithAuth } from '../../../../utils/api';

const SettingsTab = () => {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [about, setAbout] = useState('');
  const [otherContactLinks, setOtherContactLinks] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('https://localhost:7164/api/ClientProfile/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.isSuccess && data.data) {
          setProfile(data.data);
          setName(data.data.name);
          setSurname(data.data.surname);
          setCity(data.data.city || '');
          setAbout(data.data.about || '');
          setOtherContactLinks(data.data.otherContactLinks || '');
          setAvatarUrl(data.data.avatarUrl || '');
        }
      } catch (error) {
        console.error('❌ Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('https://localhost:7164/api/ClientProfile/upload-avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.isSuccess && data.data) {
        setAvatarUrl(data.data.url);
        alert('✅ Avatar uploaded successfully!');
      } else {
        alert('❌ Failed to upload avatar');
      }
    } catch (error) {
      console.error('❌ Error uploading avatar:', error);
      alert('❌ Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      await fetchWithAuth(`https://localhost:7164/api/ClientProfile/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          surname,
          city,
          about,
          otherContactLinks,
          avatarUrl,
        }),
      });
      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error('❌ Failed to update profile', err);
      alert('❌ Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="text-red-500">Profile not found.</p>;

  return (
    <div className="p-8 bg-white/50 backdrop-blur-md rounded-2xl shadow-lg space-y-10">
      {/* Avatar Upload */}
      <div className="flex flex-col items-center space-y-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Avatar
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        <input
          type="text"
          placeholder="Other Contact Links"
          value={otherContactLinks}
          onChange={(e) => setOtherContactLinks(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        <textarea
          placeholder="About you"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all md:col-span-2"
          rows={4}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
