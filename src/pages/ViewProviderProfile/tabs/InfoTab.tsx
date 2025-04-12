import { useEffect, useState } from 'react';
import AverageRating from '../../../components/Common/AverageRating';
import ReviewModal from '../components/ReviewModal';
import { motion } from 'framer-motion';

interface InfoTabProps {
  profile: any;
  currentClient: {
    name: string;
    surname: string;
    avatarUrl: string;
  };
}

const InfoTab = ({ profile }: InfoTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);

  const checkIfReviewed = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`https://localhost:7164/api/Review/has-reviewed?providerId=${profile.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setHasReviewed(data.hasReviewed);
    } catch (error) {
      console.error('❌ Error checking review status:', error);
    }
  };

  useEffect(() => {
    checkIfReviewed();
  }, []);

  return (
    <div className="flex gap-6 items-center">
      <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-60 h-60 min-w-[160px] rounded-xl overflow-hidden shadow-lg border border-gray-300"
        >
          <img
            src={profile.avatarUrl || '/default-avatar.png'}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>

      <div>
        <h2 className="text-3xl font-bold mb-1">{profile.name} {profile.surname}</h2>
        <p className="text-gray-600">{profile.city} • {profile.age} y.o.</p>

        <div className="mt-2">
          <AverageRating providerId={profile.id} />
        </div>

        <p className="text-gray-600">Gender: {profile.genderName || '—'}</p>
        <p className="text-gray-600">Age: {profile.age ?? '—'} years</p>
        <p className="text-gray-600">Experience: {profile.experienceYears ?? '—'} years</p>
        <p className="text-gray-600">Description: {profile.description || '—'}</p>
        <p className="text-gray-600">Experience: {profile.experienceYears} years</p>
        <p className="text-gray-600">Category: {profile.parentCategoryName || '—'}</p>
        <p className="text-gray-600">Registered on: {new Date(profile.createdAt).toLocaleDateString()}</p>

        {profile.isApprovedByAdmin ? (
          <p className="text-green-600">
            ✅ Approved on {new Date(profile.approvalDate!).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-yellow-600">⏳ Awaiting admin approval</p>
        )}

        <div className="mt-3">
          <h4 className="font-semibold">Services:</h4>
          <ul className="flex gap-2 flex-wrap mt-1">
            {profile.serviceTypes?.map((s: string, i: number) => (
              <li
                key={i}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Кнопка оставить отзыв */}
        {!hasReviewed && (
          <div className="mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Leave a Review
            </button>
          </div>
        )}

        {/* Модалка */}
        <ReviewModal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            checkIfReviewed(); // обновим флаг после закрытия
          }}
          providerId={profile.id}
          token={localStorage.getItem('accessToken') || ''}
        />
      </div>
    </div>
  );
};

export default InfoTab;
