import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceProvider } from '../../types/category';
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaStar,
  FaTag,
  FaVenusMars,
  FaBirthdayCake,
} from 'react-icons/fa';

const ProviderCard: React.FC<{ provider: ServiceProvider }> = ({ provider }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/service-provider/${provider.id}`)}
      className="cursor-pointer bg-white/50 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-2 flex flex-col gap-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:ring-2 hover:ring-emerald-400"
    >
      {/* avatar. name */}
      <div className="flex items-center gap-4">
        <img
          src={provider.avatarUrl || '/default-avatar.png'}
          alt={`${provider.name} ${provider.surname}`}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
        />
        <div>
          <h3 className="text-lg font-bold text-emerald-900">
            {provider.name} {provider.surname}
          </h3>
          <p className="text-sm text-emerald-900 italic flex items-center gap-1">
            <FaVenusMars className="text-pink-900" />
            {provider.genderName || '—'}
          </p>
        </div>
      </div>

      {/* city */}
      <div className="flex items-center text-sm text-emerald-900 gap-2">
        <FaMapMarkerAlt className="text-cyan-900" />
        <span>{provider.city || '—'}</span>
      </div>

      {/* age */}
      <div className="flex items-center text-sm text-emerald-900 gap-2">
        <FaBirthdayCake className="text-pink-900" />
        <span>Age: {provider.age || '—'}</span>
      </div>

      {/* experience */}
      <div className="flex items-center text-sm text-emerald-900 gap-2">
        <FaBriefcase className="text-teal-900" />
        <span>{provider.experienceYears || 0} years experience</span>
      </div>

      {/* category */}
      {provider.parentCategoryName && (
        <div className="flex items-center text-sm text-emerald-900 gap-2">
          <FaTag className="text-indigo-900" />
          <span>Category: {provider.parentCategoryName}</span>
        </div>
      )}

      {/* reyting */}
      <div className="flex items-center text-sm text-emerald-900 gap-2">
        <FaStar className="text-yellow-500" />
        <span>
          Rating:
          <span className="font-semibold ml-1 text-emerald-900">
            {provider.rating?.toFixed(2) || '0.00'}
          </span>
        </span>
      </div>

      {/* services */}
      {provider.serviceTypes?.length > 0 && (
        <div className="mt-1">
          <span className="block text-sm font-medium text-emerald-900 mb-1">Services:</span>
          <div className="flex flex-wrap gap-2">
            {provider.serviceTypes.map((type, idx) => (
              <span
                key={idx}
                className="text-xs bg-emerald-400/20 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300/30 backdrop-blur-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderCard;
