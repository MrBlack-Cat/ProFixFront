import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface Review {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  clientName?: string;
  clientAvatarUrl?: string;
}

interface ReviewsTabProps {
  providerId: number;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ providerId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/Review/by-provider/${providerId}`);
      const json = await res.json();
      setReviews(json.data || []);
    } catch (err) {
      setError('Failed to load reviews ❌');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) loadReviews();
  }, [providerId]);

  if (loading) return <div className="text-center text-cyan-600">Loading reviews... ⏳</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            className="relative bg-white/50 backdrop-blur-md rounded-2xl border border-gray-300 p-5 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
          >
            {/* client */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.clientAvatarUrl || '/default-avatar.png'}
                alt={review.clientName || 'Client'}
                className="w-12 h-12 rounded-full object-cover border border-gray-400"
              />
              <div>
                <h4 className="text-md font-semibold text-[#122E34]">
                  {review.clientName || 'Anonymous'}
                </h4>
                <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* reyting */}
            <div className="flex items-center mb-3 text-yellow-500">
              {'⭐'.repeat(review.rating)}
              <span className="text-xs text-gray-600 ml-2">({review.rating}/5)</span>
            </div>

            {/* komment */}
            <p className="text-sm text-gray-700 line-clamp-3">
              {review.comment || 'No comment.'}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 col-span-full">
          No reviews yet 💤
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
