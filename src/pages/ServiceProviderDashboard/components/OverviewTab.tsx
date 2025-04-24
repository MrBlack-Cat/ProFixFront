import React from 'react';
import AverageRating from '../../../components/Common/AverageRating';
import dayjs from 'dayjs';

interface ServiceProviderProfile {
  id: number;
  userId: number;
  name: string;
  surname: string;
  city?: string;
  age?: number;
  genderName?: string;
  experienceYears?: number;
  description?: string;
  avatarUrl?: string;
  parentCategoryName?: string;
  serviceTypes: string[];
  isApprovedByAdmin: boolean;
  approvalDate?: string;
  createdAt: string;
}

interface OverviewTabProps {
  profile: ServiceProviderProfile;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ profile }) => {
  return (
    <div className="relative bg-white/60 backdrop-blur-md border border-white/30 rounded-3xl p-6 max-w-4xl mx-auto shadow-lg text-gray-800">

      {/* Имя и фамилия */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#122E34] mb-8">
        {profile.name} {profile.surname}
      </h2>

      {/* Контент */}
      <div className="flex flex-col md:flex-row gap-8 items-center">

        {/* Левая часть */}
        <div className="flex-1 flex flex-col gap-2 text-sm">

          <div><span className="font-semibold text-gray-700">City:</span> {profile.city || '—'}</div>
          <div><span className="font-semibold text-gray-700">Age:</span> {profile.age ?? '—'}</div>
          <div><span className="font-semibold text-gray-700">Gender:</span> {profile.genderName || '—'}</div>
          <div><span className="font-semibold text-gray-700">Experience:</span> {profile.experienceYears ? `${profile.experienceYears} years` : '—'}</div>
          <div><span className="font-semibold text-gray-700">Category:</span> {profile.parentCategoryName || '—'}</div>

          {/* Service Types */}
          {profile.serviceTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.serviceTypes.map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-pink-200 text-cyan-800 text-sm rounded-full shadow-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          )}

          {/* Описание */}
          {profile.description && (
            <div className="mt-4 text-gray-700">
              <span className="font-semibold">About:</span> {profile.description}
            </div>
          )}

          {/* Дата регистрации */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-700">
            <span>Joined: {dayjs(profile.createdAt).format('YYYY-MM-DD')}</span>
            <span>
              {profile.isApprovedByAdmin ? (
                <span className="text-green-600 font-semibold">✅ Verified</span>
              ) : (
                <span className="text-yellow-600 font-semibold">⏳ Pending</span>
              )}
            </span>
          </div>

        </div>

        {/* Правая часть: Аватар + Рейтинг */}
        <div className="flex flex-col items-center gap-3">

          {/* Рейтинг */}
          <div className="flex items-center gap-2 text-cyan-700 text-sm font-semibold mb-2">
            <AverageRating providerId={profile.id} />
          </div>

          {/* Аватар */}
          <div className="w-72 h-72 min-w-[120px] rounded-2xl overflow-hidden border border-gray-300 shadow-md">
            <img
              src={profile.avatarUrl || '/default-avatar.png'}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default OverviewTab;
