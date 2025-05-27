

import React from "react";

interface Certificate {
    id: number;
    serviceProviderProfileId: number;
    title: string;
    fileUrl: string;
    issuedAt: string;
}

interface CertificateTableProps {
    certificates: Certificate[];
    onCertificateClick: (certificate: Certificate) => void;
    onDeleteCertificate: (certificateId: number) => void;
}

const CertificateTable: React.FC<CertificateTableProps> = ({
    certificates,
    onCertificateClick,
    onDeleteCertificate,
}) => {
    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                            ID
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                            Service Provider Id
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                            Title
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                            URL
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                            Issued At
                        </th>
                        <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {certificates.map((certificate) => (
                        <tr
                            key={certificate.id}
                            className="hover:bg-gray-100 transition duration-200"
                        >
                            <td className="py-4 px-6">{certificate.id}</td>
                            <td className="py-4 px-6">{certificate.serviceProviderProfileId}</td>

                            <td
                                className="py-4 px-6 text-blue-600 hover:underline cursor-pointer"
                                onClick={() => onCertificateClick(certificate)}
                            >
                                {certificate.title}
                            </td>
                            <td className="py-4 px-6 truncate max-w-xs">{certificate.fileUrl}</td>
                            <td className="py-4 px-6">
                                {new Date(certificate.issuedAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 text-center">
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => onDeleteCertificate(certificate.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                                    >
                                        Delete
                                    </button>
                                    {/* <button
                                        onClick={() => onDeleteCertificate(certificate.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                                    >
                                        Edit
                                    </button> */}
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CertificateTable;
