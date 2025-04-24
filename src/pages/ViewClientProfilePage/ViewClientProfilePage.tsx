import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api';
import PublicClientInfoCard from '../ViewClientProfilePage/PublicClientInfoCard';
import { ClientProfileDto } from './../../types/ClientProfileDto';

const ViewClientProfilePage: React.FC = () => {
  const { id } = useParams();
  const [client, setClient] = useState<ClientProfileDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const res = await fetchWithAuth(`https://localhost:7164/api/ClientProfile/${id}`);
        const json = await res.json();
        setClient(json.data);
      } catch (err) {
        console.error('Ошибка при загрузке клиента:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadClient();
  }, [id]);

  if (loading) return <p className="text-white/60 text-center mt-12">Loading client profile...</p>;
  if (!client) return <p className="text-red-400 text-center mt-12">Client not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#336074] via-[#285563] to-[#2c5364] text-white py-28 px-4">
      <div className="max-w-xl mx-auto">
        <PublicClientInfoCard client={client} />
      </div>
    </div>
  );
  
};

export default ViewClientProfilePage;
