interface Certificate {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    issuedAt: string;
  }
  
  interface CertificateCardProps {
    certificate: Certificate;
    onEdit: () => void;
    onDelete: () => void;
  }
  
  const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onEdit, onDelete }) => {
    return (
      <div className="border p-4 rounded shadow bg-white">
        <h3 className="text-lg font-bold text-indigo-700">{certificate.title}</h3>
        <p className="text-sm text-gray-600">{certificate.description}</p>
        <p className="text-xs text-gray-400 mt-1">Issued: {new Date(certificate.issuedAt).toLocaleDateString()}</p>
  
        <div className="flex justify-between items-center mt-3">
          <a
            href={certificate.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline"
          >
            View File
          </a>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
            >
              ✏️ Edit
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CertificateCard;
  