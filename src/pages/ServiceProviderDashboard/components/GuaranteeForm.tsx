import { useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface Props {
  onCreated: () => void;
}

const GuaranteeForm = ({ onCreated }: Props) => {
  const [clientId, setClientId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!clientId || !title) return alert("Client and Title are required");

    setLoading(true);
    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientProfileId: Number(clientId),
          title,
          description,
          fileUrl
        })
      });

      const json = await res.json();
      if (json.isSuccess) {
        setClientId('');
        setTitle('');
        setDescription('');
        setFileUrl('');
        onCreated();
      } else {
        alert("Error: " + JSON.stringify(json.errors));
      }
    } catch (error) {
      console.error("Create error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">➕ Add Guarantee</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="Client Profile ID"
          className="border rounded px-3 py-2"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded px-3 py-2"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border rounded px-3 py-2 col-span-1 md:col-span-2"
        />
        <input
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="File URL (optional)"
          className="border rounded px-3 py-2 col-span-1 md:col-span-2"
        />
      </div>
      <button
        disabled={loading}
        onClick={handleCreate}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {loading ? 'Creating...' : 'Create Guarantee'}
      </button>
    </div>
  );
};

export default GuaranteeForm;
