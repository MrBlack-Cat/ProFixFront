// с фреймер-анимацией
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';
import { motion } from 'framer-motion';

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
    const fetchCertificates = async () => {
      try {
        const res = await fetchWithAuth(`https://localhost:7164/api/Certificate/by-provider/${providerId}`);
        const json = await res.json();
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
    <motion.ul className="grid md:grid-cols-2 gap-4">
  {certs.map((cert, i) => (
    <motion.li
      key={cert.id}
      className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl shadow-md hover:shadow-xl transition"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.1 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-indigo-800">{cert.title}</h4>
          <p className="text-xs text-gray-500">📅 {new Date(cert.issuedAt ?? "").toLocaleDateString()}</p>
        </div>
        {cert.fileUrl && (
          <a
            href={cert.fileUrl}
            target="_blank"
            className="text-sm text-blue-600 hover:underline"
          >
            📎 View
          </a>
        )}
      </div>
    </motion.li>
  ))}
</motion.ul>

  );
};

export default CertificatesTab;
