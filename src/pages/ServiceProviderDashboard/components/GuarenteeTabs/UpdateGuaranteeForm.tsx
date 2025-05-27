import React, { useState } from 'react';
import { Guarantee } from '../../../../types/Guarantee';
import { fetchWithAuth, uploadToCloud } from '../../../../utils/api';

interface Props {
  guarantee: Guarantee;
  onUpdated: () => void;
}

const UpdateGuaranteeForm: React.FC<Props> = ({ guarantee, onUpdated }) => {
  const [title, setTitle] = useState(guarantee.title);
  const [description, setDescription] = useState(guarantee.description || '');
  const [issueDate, setIssueDate] = useState(guarantee.issueDate?.split('T')[0] || '');
  const [expirationDate, setExpirationDate] = useState(guarantee.expirationDate?.split('T')[0] || '');
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let fileUrl = guarantee.fileUrl;
      if (file) {
        fileUrl = await uploadToCloud(file);
      }

      const res = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument/${guarantee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          issueDate,
          expirationDate,
          fileUrl,
        }),
      });

      const json = await res.json();
      if (json.isSuccess) {
        onUpdated();
      } else {
        setError('Error: ' + JSON.stringify(json.errors));
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-indigo-700 text-center">✏️ Edit Guarantee</h2>

      {error && <p className="text-center text-red-600">{error}</p>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        placeholder="Title"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        placeholder="Description"
      />

      <div className="flex gap-3">
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        />
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        />
      </div>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full file:bg-indigo-100 file:text-indigo-800 file:px-4 file:py-2 file:rounded-full file:border-0 text-sm text-gray-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
      >
        {loading ? 'Updating...' : '💾 Update Guarantee'}
      </button>
    </form>
  );
};

export default UpdateGuaranteeForm;
