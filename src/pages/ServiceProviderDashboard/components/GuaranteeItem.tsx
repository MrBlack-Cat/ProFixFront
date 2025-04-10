interface Guarantee {
    id: number;
    title: string;
    description?: string;
    fileUrl?: string;
    createdAt: string;
  }
  
  const GuaranteeItem = ({ guarantee }: { guarantee: Guarantee }) => {
    return (
      <li className="bg-white shadow rounded p-4">
        <div className="flex justify-between">
          <div>
            <h4 className="font-bold text-indigo-800">{guarantee.title}</h4>
            <p className="text-sm text-gray-600">{guarantee.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              📅 {new Date(guarantee.createdAt).toLocaleDateString()}
            </p>
          </div>
          {guarantee.fileUrl && (
            <a
              href={guarantee.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline"
            >
              View File
            </a>
          )}
        </div>
      </li>
    );
  };
  
  export default GuaranteeItem;
  