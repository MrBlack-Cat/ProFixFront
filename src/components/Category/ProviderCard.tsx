import { ServiceProvider } from '../../types/category';
import { Link } from 'react-router-dom';
import AverageRating from '../../../src/components/Common/AverageRating';



interface Props {
  provider: ServiceProvider;
}

const ProviderCard = ({ provider }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all p-4 flex flex-col items-center text-center">
      <img
        src={provider.avatarUrl || '/default-avatar.png'}
        alt="Provider Avatar"
        className="w-24 h-24 rounded-full object-cover"
      />

      <h3 className="text-lg font-semibold text-gray-800">
        {provider.name} {provider.surname}
      </h3>
      <p className="text-sm text-gray-500">{provider.city}</p>
      <p className="text-sm text-gray-600 mt-1">{provider.experienceYears} years experience
      </p>
        {/* ⭐ Average Rating */}
        <div className="mt-2">
        <AverageRating providerId={provider.id} />
        </div>
      {/* Service Type */}
{/* 🛠️ Services */}
{provider.serviceTypes?.length > 0 && (
  <div className="mt-3">
    <h4 className="text-sm font-medium text-gray-700 mb-1">Services:</h4>
    <div className="flex flex-wrap gap-1 justify-center">
      {provider.serviceTypes.map((type, idx) => (
        <span
          key={idx}
          className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs"
        >
          {type}
        </span>
      ))}
    </div>
  </div>
)}


      <Link to={`/service-provider/${provider.id}`}>
        <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
          👁 View Profile
        </button>
      </Link>
    </div>
  );
};

export default ProviderCard;
