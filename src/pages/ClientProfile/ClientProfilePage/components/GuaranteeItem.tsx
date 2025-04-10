interface Guarantee {
    id: number;
    title: string;
    description?: string;
    fileUrl?: string;
    createdAt: string;
  }
  
  const GuaranteeItem = ({ guarantee }: { guarantee: Guarantee }) => {
    return (
      <li className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-indigo-700 text-lg">{guarantee.title}</h4>
          {guarantee.description && (
            <p className="text-sm text-gray-600 mt-1">{guarantee.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            📅 {new Date(guarantee.createdAt).toLocaleDateString()}
          </p>
        </div>
        {guarantee.fileUrl && (
          <a
            href={guarantee.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            View File
          </a>
        )}
      </li>
    );
  };
  
  export default GuaranteeItem;
  