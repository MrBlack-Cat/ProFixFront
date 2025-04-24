import React, { useEffect, useState } from 'react';
import CertificateCard from './CertificateCard';
import { Certificate } from '../../../../types/Certificate';
import { fetchWithAuth } from '../../../../utils/api';

interface Props {
  providerId: number;
  onCreateClick: () => void;
  onEdit: (certificate: Certificate) => void;
}

const CertificatesTab: React.FC<Props> = ({ providerId, onCreateClick, onEdit }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/Certificate/by-provider/${providerId}`);
      const json = await res.json();
      console.log('📦 Response JSON:', json);
      setCertificates(json.data ?? []);
    } catch (err) {
      console.error('❌ Failed to fetch certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) fetchCertificates();
  }, [providerId]);

  const handleDelete = async (id: number) => {
    const reason = prompt('Enter reason for deletion:');
    if (!reason) return;

    const res = await fetchWithAuth(`https://localhost:7164/api/Certificate/${id}?reason=${encodeURIComponent(reason)}`, {
      method: 'DELETE',
    });

    const json = await res.json();
    if (res.ok) {
      alert(json.data || 'Deleted!');
      fetchCertificates();
    } else {
      alert(json.errors?.[0] || 'Delete failed');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={onCreateClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          ➕ Add Certificate
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : certificates.length === 0 ? (
        <div className="text-center text-gray-500">No certificates yet.</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map(cert => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onEdit={() => onEdit(cert)}
              onDelete={() => handleDelete(cert.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesTab;
