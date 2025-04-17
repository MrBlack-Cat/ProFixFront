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
        alert('✅ Avatar uploaded!');
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

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="space-y-6">

      {/* Avatar Upload */}
      <div className="space-y-2">
        {avatarUrl && (
          <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-blue-500" />
        )}
        <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
      </div>

      {/* Other Fields */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          className="w-full p-2 border rounded"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          className="w-full p-2 border rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <textarea
          placeholder="About you"
          className="w-full p-2 border rounded"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <input
          type="text"
          placeholder="Other contact links"
          className="w-full p-2 border rounded"
          value={otherContactLinks}
          onChange={(e) => setOtherContactLinks(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default SettingsTab;
