import React, { useState } from 'react';
import { fetchWithAuth } from '../../../../utils/api';
import { Certificate } from '../../../../types/Certificate';

interface Props {
  certificate: Certificate;
  onSuccess: () => void;
}

const UpdateCertificateForm: React.FC<Props> = ({ certificate, onSuccess }) => {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [issuedAt, setIssuedAt] = useState(certificate.issuedAt.split('T')[0]); 
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (): Promise<string | null> => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetchWithAuth('https://localhost:7164/api/FileUpload/upload-certificate-file', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      return json?.data?.url || null;
    } catch {
      setError('File upload failed');
      return null;
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let fileUrl = certificate.fileUrl;

    if (file) {
      const uploadedUrl = await handleFileUpload();
      if (!uploadedUrl) {
        setLoading(false);
        return;
      }
      fileUrl = uploadedUrl;
    }

    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/Certificate/${certificate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          fileUrl,
          issuedAt,
        }),
      });

      const json = await res.json();
      if (res.ok) onSuccess();
      else setError(json.errors?.[0] || 'Update failed');
    } catch {
      setError('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-5 w-full">
      <h2 className="text-xl font-bold text-yellow-700 text-center">✏️ Update Certificate</h2>
      {error && <p className="text-center text-red-600">{error}</p>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        placeholder="Title"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        placeholder="Description"
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
        className="w-full file:bg-yellow-100 file:text-yellow-800 file:px-4 file:py-2 file:rounded-full file:border-0 text-sm text-gray-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
      >
        {loading ? 'Updating...' : '💾 Update Certificate'}
      </button>
    </form>
  );
};

export default UpdateCertificateForm;
