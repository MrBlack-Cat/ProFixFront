import React, { useEffect, useState } from 'react';
import CertificateCard from './CertificateCard';
import CreateCertificateForm from './CreateCertificateForm';
import UpdateCertificateForm from './UpdateCertificateForm';
import { fetchWithAuth } from '../../../utils/api';

interface Certificate {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  issuedAt: string;
}

const CertificatesTab: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchCertificates = async () => {
    try {
      const profileRes = await fetchWithAuth('https://localhost:7164/api/ServiceProviderProfile/user');
      const profileJson = await profileRes.json();
      const profileId = profileJson.data?.id;
  
      if (!profileId) throw new Error('ServiceProviderProfileId not found');
  
      const certRes = await fetchWithAuth(`https://localhost:7164/api/Certificate/by-provider/${profileId}`);
      const certJson = await certRes.json();
      setCertificates(certJson.data ?? []);
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCertificates();
  }, []);

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
      alert(json.errors?.[0] || 'Error deleting');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreate(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ Add Certificate
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : certificates.length === 0 ? (
        <div className="text-gray-500 text-center">No certificates yet.</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onEdit={() => {
                setSelected(cert);
                setShowEdit(true);
              }}
              onDelete={() => handleDelete(cert.id)}
            />
          ))}
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowCreate(false)}
            >
              ✖
            </button>
            <CreateCertificateForm
              onSuccess={() => {
                setShowCreate(false);
                fetchCertificates();
              }}
            />
          </div>
        </div>
      )}

      {showEdit && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
              onClick={() => {
                setShowEdit(false);
                setSelected(null);
              }}
            >
              ✖
            </button>
            <UpdateCertificateForm
              certificate={selected}
              onSuccess={() => {
                setShowEdit(false);
                setSelected(null);
                fetchCertificates();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesTab;
