import React, { useEffect, useState } from 'react';
import ComplaintModal from '../components/ComplaintModal';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  AlertOctagon,
  Star,
  CalendarCheck,
} from 'lucide-react';

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
  }| null;
}

const InfoTab: React.FC<InfoTabProps> = ({ profile, currentClient }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);


  const navigate = useNavigate();

  const checkIfReviewed = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`https://localhost:7164/api/Review/has-reviewed?providerId=${profile.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHasReviewed(data.hasReviewed);
    } catch (error) {
      console.error('❌ Error checking review status:', error);
    }
  };

  const token = localStorage.getItem('accessToken');
  const isAuthenticated = !!token;
  

  useEffect(() => {
    checkIfReviewed();
  }, []);

  return (
    <div className="flex gap-6 items-start flex-col md:flex-row">
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

      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-1">{profile.name} {profile.surname}</h2>
        <p className="text-gray-600">{profile.city} • {profile.age} y.o.</p>

        <div className="mt-2">
          <AverageRating providerId={profile.id} />
        </div>

        <div className="text-gray-600 mt-2 space-y-1">
          <p>Gender: <span className="font-medium">{profile.genderName || '—'}</span></p>
          <p>Experience: <span className="font-medium">{profile.experienceYears ?? '—'} years</span></p>
          <p>Category: <span className="font-medium">{profile.parentCategoryName || '—'}</span></p>
          <p>Registered on: <span className="font-medium">{new Date(profile.createdAt).toLocaleDateString()}</span></p>

          {profile.isApprovedByAdmin ? (
            <p className="text-green-600">
              Approved on {new Date(profile.approvalDate!).toLocaleDateString()}
            </p>
          ) : (
            <p className="text-yellow-600">⏳ Awaiting admin approval</p>
          )}
        </div>

        {/* Services */}
        <div className="mt-4">
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

        <div className="mt-5 flex flex-wrap gap-3">
  <button
    onClick={() => {
      if (!isAuthenticated) return navigate('/login');
      if (!hasReviewed) setIsReviewModalOpen(true);
    }}
    className={`flex items-center gap-2 px-4 py-2 rounded shadow transition ${
      isAuthenticated ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-400 cursor-not-allowed text-gray-100"
    }`}
    disabled={!isAuthenticated}
  >
    <Star size={18} /> Leave a Review
  </button>

  <button
    onClick={() => {
      if (!isAuthenticated) return navigate('/login');
      setIsBookingModalOpen(true);
    }}
    className={`flex items-center gap-2 px-4 py-2 rounded shadow transition ${
      isAuthenticated ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 cursor-not-allowed text-gray-100"
    }`}
    disabled={!isAuthenticated}
  >
    <CalendarCheck size={18} /> Book a Service
  </button>

  <button
    onClick={() => {
      if (!isAuthenticated) return navigate('/login');
      navigate(`/chat/${profile.userId}`);
    }}
    className={`flex items-center gap-2 px-4 py-2 rounded shadow transition ${
      isAuthenticated ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-gray-400 cursor-not-allowed text-gray-100"
    }`}
    disabled={!isAuthenticated}
  >
    <MessageCircle size={18} /> Send Message
  </button>

  <button
  onClick={() => {
      if (!isAuthenticated) return navigate('/login');
      setIsComplaintOpen(true);   
    }}
    className={`flex items-center gap-2 px-4 py-2 rounded shadow transition ${
      isAuthenticated ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-400 cursor-not-allowed text-gray-100"
    }`}
    disabled={!isAuthenticated}
  >
    <AlertOctagon size={18} /> Complaint
  </button>





</div>


        {/* Modals */}
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



      </div>
    </div>
  );
};

export default InfoTab;
