import GuaranteeItem from './GuaranteeItem';

interface Guarantee {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
}

const GuaranteeList = ({ guarantees, loading }: { guarantees: Guarantee[]; loading: boolean }) => {
  if (loading) return <p className="text-gray-500">Loading guarantees...</p>;
  if (!guarantees.length) return <p className="text-gray-500">No guarantees found.</p>;

  return (
    <ul className="grid gap-4">
      {guarantees.map((g) => (
        <GuaranteeItem key={g.id} guarantee={g} />
      ))}
    </ul>
  );
};

export default GuaranteeList;
