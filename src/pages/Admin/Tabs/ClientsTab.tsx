
import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../Components/ClientTable";
import ClientEditModal from "../Components/ClientEditModal";

interface ClientProfile {
  id: number;
  userId: number;
  name: string;
  surname: string;
  city: string;
  email: string;
}

const ClientTab = () => {
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError("Token tapılmadı.");
          return;
        }

        const response = await axios.get("https://localhost:7164/api/clientprofile/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        if (Array.isArray(data)) setClients(data);
        else if (Array.isArray(data.users)) setClients(data.users);
        else if (Array.isArray(data.data)) setClients(data.data);
        else setError("Serverdən düzgün formatda istifadəçi siyahısı gəlmədi.");
      } catch {
        setError("İstifadəçilər yüklənərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleBlockUser = async (userId: number) => {
    const deletedReason = prompt("please , write reason of deactivating profile:");
    if (!deletedReason || deletedReason.trim() === "") return alert("Reason for deleting !");

    const token = localStorage.getItem('accessToken');
    if (!token) return alert("Token doesnt find .");

    try {
      await axios.delete(`https://localhost:7164/api/users/${userId}?deletedReason=${encodeURIComponent(deletedReason)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setClients(prev => prev.filter(client => client.id !== userId));
    } catch {
      alert("error accured while deactivating.");
    }
  };

  const handleEditClick = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    if (client) setSelectedClient(client);
  };

  const handleSave = (updatedClient: ClientProfile) => {
    setClients(prev =>
      prev.map(c => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900">All Clients</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <UserTable
          clients={clients}
          onBlockUser={handleBlockUser}
          onEditUser={handleEditClick}
        />
      )}

      {selectedClient && (
        <ClientEditModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ClientTab;
