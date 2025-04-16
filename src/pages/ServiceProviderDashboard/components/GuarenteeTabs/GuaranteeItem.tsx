import { FaFilePdf, FaCalendarCheck, FaCalendarTimes, FaRegFileAlt } from "react-icons/fa";

interface Guarantee {
  id: number;
  title: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
  issueDate?: string;
  expirationDate?: string;
}

const ServiceGuaranteeItem = ({ guarantee }: { guarantee: Guarantee }) => {
  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "—";

  const isExpired = guarantee.expirationDate
    ? new Date(guarantee.expirationDate) < new Date()
    : false;

  return (
    
    <div className="relative rounded-xl p-5 bg-white/30 backdrop-blur-lg border border-gray-200 shadow-lg transition hover:scale-[1.02] hover:shadow-xl duration-300">
      {/* Icon */}
      <div className="absolute top-3 left-3 bg-green-100 text-green-600 p-2 rounded-full shadow">
        <FaRegFileAlt size={18} />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1 pl-8">{guarantee.title}</h3>

      {guarantee.description && (
        <p className="text-sm text-gray-600 mb-3 pl-8">{guarantee.description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 pl-8">
        <div className="flex items-center gap-2">
          <FaCalendarCheck />
          <span>Issued: {formatDate(guarantee.issueDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarTimes />
          <span className={isExpired ? "text-red-500" : ""}>
            Expires: {formatDate(guarantee.expirationDate)}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:col-span-2">
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
            className="inline-flex items-center px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition"
          >
            <FaFilePdf className="mr-2" />
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ServiceGuaranteeItem;
