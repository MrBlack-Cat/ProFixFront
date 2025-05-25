import { useState, useEffect } from "react";
import axios from "axios";
import CertificateTable from "../Components/CertificateTable"; 
import CertificateDetailModal from "../Components/CertificateDetailModal"; 



interface Certificate{
  id:number;
  serviceProviderProfileId :number;
  title:string;
  fileUrl:string;
  issuedAt:string;
}

const CertificateTab = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [searchProviderId, setSearchProviderId] = useState<string>("");

  const fetchCertificates = async (id?: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError("Token tapılmadı.");
        return;
      }

      let url = "https://localhost:7164/api/certificate";
      if (id) {
        url += `/by-provider/${id}`;
      }else {
        url += `/all`; // Əks halda hamısını gətir
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data); 

      if (Array.isArray(response.data)) {
        setCertificates(response.data);
      } else if (Array.isArray(response.data.certificates)) {
        setCertificates(response.data.certificates);
      } else if (Array.isArray(response.data.data)) {
        setCertificates(response.data.data);
      } else {
        setError("Serverdən düzgün formatda sertifikat siyahısı gəlmədi.");
      }
    } catch (err) {
      setError("Sertifikatlar yüklənərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleDeleteCertificate = async (certificateId: number) => {
    try {
      const deletedReason = prompt("Zəhmət olmasa silmə səbəbini yazın:");

      if (!deletedReason || deletedReason.trim() === "") {
        alert("Silmə səbəbi tələb olunur!");
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("Token tapılmadı.");
        return;
      }

      await axios.delete(`https://localhost:7164/api/certificate/${certificateId}?deletedReason=${encodeURIComponent(deletedReason)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Sertifikat silindi.");
      fetchCertificates(); // Siləndən sonra siyahını yenilemek ucundur
    } catch (err) {
      alert("Sertifikat silinərkən xəta baş verdi.");
    }
  };

  const handleBackClick = () => {
    setSelectedCertificate(null);
  };

  const handleSearch = () => {
    if (searchProviderId.trim() === "") {
      fetchCertificates();
    } else {
      fetchCertificates(searchProviderId.trim());
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bütün Sertifikatlar</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="search by service provider ID"
          value={searchProviderId}
          onChange={(e) => setSearchProviderId(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading..</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <CertificateTable
          certificates={certificates}
          onCertificateClick={handleCertificateClick}
          onDeleteCertificate={handleDeleteCertificate}
        />
      )}

      {selectedCertificate && (
        <CertificateDetailModal
          certificate={selectedCertificate}
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default CertificateTab;
