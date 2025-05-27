import { useEffect, useState } from 'react';
import { fetchWithAuth, getDecodedToken } from '../../../../utils/api';
import GuaranteeList from '../components/GuaranteeList';

interface Guarantee {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
}

const GuaranteesTab = () => {
  const [guarantees, setGuarantees] = useState<Guarantee[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const loadGuarantees = async () => {
    setLoading(true);
    try {
      const decoded = getDecodedToken();
      const userRole = decoded?.role;
      setRole(userRole ?? null);

      let profileId: number | null = null;

      if (userRole === 'Client') {
        const res = await fetchWithAuth('https://localhost:7164/api/ClientProfile/user');
        const json = await res.json();
        profileId = json?.data?.id;
        console.log("ClientProfile response:", json);
        console.log("Extracted clientProfileId:", profileId);

        if (profileId === null || profileId === undefined) throw new Error('ClientProfile not found');
        const response = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument/by-client/${profileId}`);
        const guaranteesJson = await response.json();
        setGuarantees(guaranteesJson.data || []);
      }

      if (userRole === 'ServiceProvider') {
        const res = await fetchWithAuth('https://localhost:7164/api/ServiceProviderProfile/user');
        const json = await res.json();
        profileId = json?.data?.id;
        console.log("ClientProfile response:", json);
        console.log("Extracted clientProfileId:", profileId);

        if (!profileId) throw new Error('ServiceProviderProfile not found');
        const response = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument/by-provider/${profileId}`);
        const guaranteesJson = await response.json();
        setGuarantees(guaranteesJson.data || []);
      }

    } catch (error) {
      console.error('Failed to load guarantees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuarantees();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-indigo-700">
        Guarantees for {role}
      </h2>
      <GuaranteeList guarantees={guarantees} loading={loading} />
    </div>
  );
};

export default GuaranteesTab;
