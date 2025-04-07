import React, { useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface Props {
  onSuccess: () => void;
}

const CreateCertificateForm: React.FC<Props> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetchWithAuth('https://localhost:7164/api/Certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, fileUrl, issuedAt }),
      });

      const json = await res.json();
      if (res.ok) {
        onSuccess();
      } else {
        setError(json.errors?.[0] || 'Failed to create certificate');
      }
    } catch {
      setError('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add Certificate</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Description"
      />
      <input
        type="text"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="File URL"
      />
      <input
        type="datetime-local"
        value={issuedAt}
        onChange={(e) => setIssuedAt(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default CreateCertificateForm;
