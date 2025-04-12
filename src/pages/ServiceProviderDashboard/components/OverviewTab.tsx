import React from 'react';
import AverageRating from '../../../components/Common/AverageRating';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';


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
    
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto text-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-center">👤 Service Provider Overview</h2>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Левая часть: Текстовая информация */}
        <div className="flex-1 space-y-2">
          
          <p><strong>Name:</strong> {profile.name} {profile.surname}</p>
          <p><strong>City:</strong> {profile.city || '—'}</p>
          <p><strong>Age:</strong> {profile.age ?? '—'}</p>
          <p><strong>Gender:</strong> {profile.genderName || '—'}</p>
          <p><strong>Experience:</strong> {profile.experienceYears != null ? `${profile.experienceYears} years` : '—'}</p>
          <p><strong>Category:</strong> {profile.parentCategoryName || '—'}</p>
          <p><strong>Service Types:</strong> {profile.serviceTypes.length > 0 ? profile.serviceTypes.join(', ') : '—'}</p>
          <p><strong>Description:</strong> {profile.description || '—'}</p>
          <p><strong>Created At:</strong> {profile.createdAt ? dayjs(profile.createdAt).format('YYYY-MM-DD') : '—'}</p>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2">
            <strong>Rating:</strong>
            <AverageRating providerId={profile.id} />
          </div>

          {/* ✅ Статус подтверждения */}
          <p>
            <strong>Verification:</strong>{' '}
            {profile.isApprovedByAdmin
              ? <span className="text-green-600 font-medium">✅ Approved</span>
              : <span className="text-yellow-600 font-medium">⏳ Pending</span>}
          </p>
        </div>

        {/* Правая часть: Аватар */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-80 h-80 min-w-[160px] rounded-xl overflow-hidden shadow-lg border border-gray-300"
        >
          <img
            src={profile.avatarUrl || '/default-avatar.png'}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default OverviewTab;
