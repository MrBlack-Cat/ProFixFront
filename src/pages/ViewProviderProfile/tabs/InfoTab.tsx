import React, { useEffect, useState } from 'react';
import ComplaintModal from '../components/ComplaintModal';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, AlertOctagon, Star, CalendarCheck } from 'lucide-react';
import AverageRating from '../../../components/Common/AverageRating';
import ReviewModal from '../components/ReviewModal';
import BookingModal from '../components/BookingModal';


interface InfoTabProps {
  profile: any;
  currentClient: {
    id: number;
    name: string;
    surname: string;
    avatarUrl: string;
    userId: number;
  } | null;
}

const InfoTab: React.FC<InfoTabProps> = ({ profile, currentClient }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = !!token;

  const checkIfReviewed = async () => {
    try {
      const res = await fetch(`https://localhost:7164/api/Review/has-reviewed?providerId=${profile.id}`, {
        headers: { Authorization: `Bearer ${token}` },
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
    <div className="flex flex-col md:flex-row gap-8">

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-64 h-64 min-w-[160px] rounded-3xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30"
      >
        <img
          src={profile.avatarUrl || '/default-avatar.png'}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{profile.name} {profile.surname}</h2>
        <p className="text-gray-700">{profile.city} • {profile.age} y.o.</p>

        <div className="mt-3">
          <AverageRating providerId={profile.id} />
        </div>

        <div className="text-gray-700 mt-4 space-y-1 text-sm">
          <p><span className="font-semibold">Gender:</span> {profile.genderName || '—'}</p>
          <p><span className="font-semibold">Experience:</span> {profile.experienceYears ?? '—'} years</p>
          <p><span className="font-semibold">Category:</span> {profile.parentCategoryName || '—'}</p>
          <p><span className="font-semibold">Registered:</span> {new Date(profile.createdAt).toLocaleDateString()}</p>

          {profile.isApprovedByAdmin ? (
            <p className="text-green-900 font-semibold">✅ Approved</p>
          ) : (
            <p className="text-yellow-600 font-semibold">⏳ Awaiting admin approval</p>
          )}
        </div>

        {/* Services */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {profile.serviceTypes?.map((s: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">

          <ActionButton
            onClick={() => {
              if (!isAuthenticated) return navigate('/login');
              if (!hasReviewed) setIsReviewModalOpen(true);
            }}
            disabled={!isAuthenticated}
            text="Leave Review"
            icon={<Star size={18} />}
            color="bg-indigo-600 hover:bg-indigo-700"
          />

          <ActionButton
            onClick={() => {
              if (!isAuthenticated) return navigate('/login');
              setIsBookingModalOpen(true);
            }}
            disabled={!isAuthenticated}
            text="Book Service"
            icon={<CalendarCheck size={18} />}
            color="bg-blue-600 hover:bg-blue-700"
          />

          <ActionButton
            onClick={() => {
              if (!isAuthenticated) return navigate('/login');
              navigate(`/messages?userId=${profile.userId}`);
            }}
            disabled={!isAuthenticated}
            text="Send Message"
            icon={<MessageCircle size={18} />}
            color="bg-teal-600 hover:bg-teal-700"
          />

          <ActionButton
            onClick={() => {
              if (!isAuthenticated) return navigate('/login');
              setIsComplaintOpen(true);
            }}
            disabled={!isAuthenticated}
            text="Complaint"
            icon={<AlertOctagon size={18} />}
            color="bg-red-600 hover:bg-red-700"
          />

        </div>

        <ReviewModal
          isOpen={isReviewModalOpen}
          onRequestClose={() => {
            setIsReviewModalOpen(false);
            checkIfReviewed();
          }}
          providerId={profile.id}
          token={localStorage.getItem('accessToken') || ''}
        />

        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          providerId={profile.id}
          clientId={currentClient?.id ?? 0}
        />

        <ComplaintModal
          isOpen={isComplaintOpen}
          onClose={() => setIsComplaintOpen(false)}
          toUserId={profile.userId}
        />

      </motion.div>
    </div>
  );
};

const ActionButton = ({
  onClick,
  disabled,
  text,
  icon,
  color,
}: {
  onClick: () => void;
  disabled: boolean;
  text: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md text-white text-sm transition ${color} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    {icon}
    {text}
  </button>
);

export default InfoTab;
