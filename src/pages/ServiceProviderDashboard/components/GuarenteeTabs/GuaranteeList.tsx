import GuaranteeItem from './GuaranteeItem';

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
  guarantees: Guarantee[];
  loading: boolean;
  onEdit?: (g: Guarantee) => void;
  onDelete?: (id: number) => void;
}

const GuaranteeList: React.FC<Props> = ({ guarantees, loading, onEdit, onDelete }) => {
  if (loading) return <p className="text-center text-blue-600">Loading guarantees... ⏳</p>;
  if (!guarantees.length) return <p className="text-center text-gray-400">No guarantees found 💤</p>;

  const sorted = [...guarantees].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((g) => (
        <GuaranteeItem
          key={g.id}
          guarantee={g}
          onEdit={onEdit ? () => onEdit(g) : undefined}
          onDelete={onDelete ? () => onDelete(g.id) : undefined}
        />
      ))}
    </ul>
  );
};

export default GuaranteeList;
