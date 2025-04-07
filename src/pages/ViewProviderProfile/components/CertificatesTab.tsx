import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface Certificate {
  id: number;
  title: string;
  fileUrl?: string;
  issuedAt?: string;
}

const CertificatesTab = ({ providerId }: { providerId: number }) => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("providerId passed to CertificatesTab", providerId); 
  
    const fetchCertificates = async () => {
      try {
        const res = await fetchWithAuth(`https://localhost:7164/api/Certificate/by-provider/${providerId}`);
        const json = await res.json();
        console.log("Certificates Response", json); 
        setCerts(json.data ?? []);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (providerId) fetchCertificates();
  }, [providerId]);
  

  if (loading) return <p>Loading certificates...</p>;
  if (!certs.length) return <p>No certificates available.</p>;

  return (
    <ul className="space-y-3">
      {certs.map((c) => (
        <li key={c.id} className="p-4 bg-gray-100 rounded shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{c.title}</h4>
              {c.issuedAt && (
                <p className="text-xs text-gray-500">
                  Issued: {new Date(c.issuedAt).toLocaleDateString()}
                </p>
              )}
            </div>
            {c.fileUrl && (
              <a
                href={c.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View PDF
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CertificatesTab;
