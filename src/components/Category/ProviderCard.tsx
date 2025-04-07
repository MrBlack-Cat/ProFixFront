import { ServiceProvider } from '../../types/category';
import { Link } from 'react-router-dom';


interface Props {
  provider: ServiceProvider;
}

const ProviderCard = ({ provider }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all p-4 flex flex-col items-center text-center">
      <img
        src={provider.avatarUrl || 'https://via.placeholder.com/100'}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">
        {provider.name} {provider.surname}
      </h3>
      <p className="text-sm text-gray-500">{provider.city}</p>
      <p className="text-sm text-yellow-600 font-medium mt-1">⭐ {provider.rating ?? '4.5'}</p>
      <p className="text-sm text-gray-600 mt-1">
        {provider.experienceYears} years experience
      </p>

      {/* Service Type */}
      {provider.serviceTypeNames?.length > 0 && (
  <div className="flex flex-wrap gap-1 mt-2 justify-center">
    {provider.serviceTypeNames.map((type, idx) => (
      <span
        key={idx}
        className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs"
      >
        {type}
      </span>
    ))}
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
