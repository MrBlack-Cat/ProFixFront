import React from "react";
interface Certificate{
    id:number;
    serviceProviderProfileId :number;
    title:string;
    fileUrl:string;
    issuedAt:string;
  }
interface CertificateDetailModalProps {
  certificate: Certificate;
  onBackClick: () => void;
}
const CertificateDetailModal: React.FC<CertificateDetailModalProps> = ({
  certificate,
  onBackClick,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Sertifikat Detalları</h3>
        <p><strong>ID:</strong> {certificate.id}</p>
        <p><strong>Adı:</strong> {certificate.serviceProviderProfileId}</p>
        <p><strong>Adı:</strong> {certificate.title}</p>
        <p><strong>Təşkilat:</strong> {certificate.fileUrl}</p>
        <p><strong>Verilmə Tarixi:</strong> {new Date(certificate.issuedAt).toLocaleDateString()}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onBackClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Geri
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetailModal;
