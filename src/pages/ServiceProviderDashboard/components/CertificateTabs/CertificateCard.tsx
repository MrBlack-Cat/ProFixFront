import React from 'react';
import { Certificate } from '../../../../types/Certificate';

interface Props {
  certificate: Certificate;
  onEdit: () => void;
  onDelete: () => void;
}

const CertificateCard: React.FC<Props> = ({ certificate, onEdit, onDelete }) => {
  return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-5 flex flex-col justify-between transition hover:shadow-2xl">
      <div>
        <h3 className="text-xl font-semibold text-indigo-900">{certificate.title}</h3>
        <p className="text-sm text-gray-800 mt-1 line-clamp-2">{certificate.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          📅 Issued: {new Date(certificate.issuedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <a
          href={certificate.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 text-sm underline hover:text-indigo-800 transition"
        >
          📄 View PDF
        </a>
        <div className="flex gap-4 text-sm">
          <button onClick={onEdit} className="text-yellow-600 hover:text-yellow-700 transition">
            ✏️ Edit
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-600 transition">
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
