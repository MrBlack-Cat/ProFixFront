import { FaFilePdf, FaCalendarCheck, FaCalendarTimes, FaRegFileAlt, FaEdit, FaTrash } from "react-icons/fa";

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
  guarantee: Guarantee;
  onEdit?: () => void;
  onDelete?: () => void;
}

const GuaranteeItem = ({ guarantee, onEdit, onDelete }: Props) => {
  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "—";

  const isExpired = guarantee.expirationDate
    ? new Date(guarantee.expirationDate) < new Date()
    : false;

  return (
    <div className="relative rounded-2xl p-6 bg-white/30 backdrop-blur-md border border-gray-300 shadow-md hover:shadow-lg transition hover:scale-105 duration-300">
      <div className="absolute top-3 left-3 bg-green-200 text-green-800 p-2 rounded-full shadow">
        <FaRegFileAlt size={18} />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2 pl-8">{guarantee.title}</h3>

      {guarantee.description && (
        <p className="text-sm text-gray-600 mb-4 pl-8">{guarantee.description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 pl-8">
        <div className="flex items-center gap-1">
          <FaCalendarCheck />
          <span>Issued: {formatDate(guarantee.issueDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCalendarTimes />
          <span className={isExpired ? "text-red-500" : ""}>
            Expires: {formatDate(guarantee.expirationDate)}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:col-span-2">
          <FaCalendarCheck />
          <span>Created: {formatDate(guarantee.createdAt)}</span>
        </div>
      </div>

      {guarantee.fileUrl && (
        <div className="mt-4 pl-8">
          <a
            href={guarantee.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition"
          >
            <FaFilePdf className="mr-2" />
            View File
          </a>
        </div>
      )}

      <div className="mt-4 flex justify-end gap-4 pr-4">
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm text-yellow-600 hover:text-yellow-800 transition flex items-center gap-1"
          >
            <FaEdit size={14} /> Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-sm text-red-600 hover:text-red-800 transition flex items-center gap-1"
          >
            <FaTrash size={14} /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default GuaranteeItem;
