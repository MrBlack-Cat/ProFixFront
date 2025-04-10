import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';
import GuaranteeList from './GuaranteeList';
import GuaranteeForm from './GuaranteeForm';

interface Guarantee {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
}

const GuaranteesTab = ({ providerId }: { providerId: number }) => {
  const [guarantees, setGuarantees] = useState<Guarantee[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGuarantees = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument/by-provider/${providerId}`);
      const json = await res.json();
      setGuarantees(json.data || []);
    } catch (error) {
      console.error("Failed to load guarantees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) loadGuarantees();
  }, [providerId]);

  return (
    <div className="space-y-6">
      <GuaranteeForm onCreated={loadGuarantees} />
      <GuaranteeList guarantees={guarantees} loading={loading} />
    </div>
  );
};

export default GuaranteesTab;
