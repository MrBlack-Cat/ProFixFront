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

  if (loading) return <p className="text-gray-500">Loadting...</p>;
  if (!client) return <p className="text-red-500">Client not found.</p>;

  return (
    <div className="py-28  max-w-xl mx-auto">
      <PublicClientInfoCard client={client} />
    </div>
  );
};

export default ViewClientProfilePage;
