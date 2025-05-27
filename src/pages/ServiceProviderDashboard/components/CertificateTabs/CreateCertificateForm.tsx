import React, { useState } from 'react';
import { fetchWithAuth } from '../../../../utils/api';

interface Props {
  onSuccess: () => void;
}

const CreateCertificateForm: React.FC<Props> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (): Promise<string | null> => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await fetchWithAuth('https://localhost:7164/api/FileUpload/upload-certificate-file', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      return json?.data?.url || null;
    } catch {
      setError('❌ File upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fileUrl = await handleFileUpload();
    if (!fileUrl) {
      setError('⚠️ Please upload a valid PDF file');
      setLoading(false);
      return;
    }

    try {
      const res = await fetchWithAuth('https://localhost:7164/api/Certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, fileUrl, issuedAt }),
      });

      const json = await res.json();
      if (res.ok) onSuccess();
      else setError(json.errors?.[0] || 'Failed to create certificate');
    } catch {
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <h2 className="text-xl font-bold text-indigo-700 text-center">📜 Add Certificate</h2>

      {error && <p className="text-center text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur focus:outline-none"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
      />
      <input
        type="date"
        value={issuedAt}
        onChange={(e) => setIssuedAt(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
      />
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
        className="w-full file:bg-indigo-100 file:text-indigo-800 file:px-4 file:py-2 file:rounded-full file:border-0 text-sm text-gray-500"
      />

      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full py-3 bg-indigo-600/90 text-white rounded-3xl hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : uploading ? 'Uploading File...' : 'Create'}
      </button>
    </form>
  );
};

export default CreateCertificateForm;
