import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../../utils/api';
import GuaranteeList from './GuaranteeList';

interface Guarantee {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
  issueDate?: string;
  expirationDate?: string;
}

interface Props {
  providerId: number;
  onEdit: (g: Guarantee) => void;
  onCreateClick: () => void;
  onDelete?: (id: number) => void; // optional if you plan to support deletion later
}

const GuaranteesTab: React.FC<Props> = ({ providerId, onEdit, onCreateClick, onDelete }) => {
  const [guarantees, setGuarantees] = useState<Guarantee[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGuarantees = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument/by-provider/${providerId}`);
      const json = await res.json();
      setGuarantees(json.data || []);
    } catch (error) {
      console.error('Failed to load guarantees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) loadGuarantees();
  }, [providerId]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={onCreateClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          ➕ Add Guarantee
        </button>
      </div>

      <GuaranteeList
        guarantees={guarantees}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default GuaranteesTab;
