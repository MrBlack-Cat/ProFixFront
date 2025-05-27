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

  if (loading) return <p className="text-center text-blue-500 animate-pulse">Loading certificates...</p>;
  if (!certs.length) return <p className="text-center text-gray-400">No certificates available.</p>;

  return (
    <motion.ul
      className="grid md:grid-cols-2 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      {certs.map((cert) => (
        <motion.li
          key={cert.id}
          className="bg-white/30 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold text-indigo-800">{cert.title}</h4>
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
            <p className="text-sm text-gray-600">Issued: {cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString() : '—'}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default CertificatesTab;
