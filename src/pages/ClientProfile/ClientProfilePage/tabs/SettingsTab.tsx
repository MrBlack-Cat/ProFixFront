import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsTab = () => {
  const [deleteReason, setDeleteReason] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!deleteReason.trim()) {
      alert('Please provide a reason for deletion.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');

      const response = await fetch(`https://localhost:7164/api/ClientProfile/delete-own`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deleteReason }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || 'Failed to delete profile');
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('Your profile has been deleted.');
      navigate('/login');
    } catch (error: any) {
      alert(error.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>

      <div>
        <label htmlFor="deleteReason" className="block mb-1 text-sm font-medium text-gray-700">
          Reason for deleting profile
        </label>
        <textarea
          id="deleteReason"
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded"
          placeholder="Type your reason..."
        />
      </div>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Deleting...' : 'Delete Profile'}
      </button>
    </div>
  );
};

export default SettingsTab;
