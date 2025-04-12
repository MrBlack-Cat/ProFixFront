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

const GuaranteeList = ({ guarantees, loading }: { guarantees: Guarantee[], loading: boolean }) => {
  if (loading) return <p>Loading guarantees...</p>;
  if (!guarantees.length) return <p>No guarantees found.</p>;

  const sorted = [...guarantees].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ul className="grid gap-4">
      {sorted.map(g => (
        <GuaranteeItem key={g.id} guarantee={g} />
      ))}
    </ul>
  );
};

export default GuaranteeList;
