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

interface Props {
  providerId: number;
}

const ReviewsTab: React.FC<Props> = ({ providerId }) => {
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
    loadReviews();
  }, [providerId]);

  if (loading) return <div className="text-center text-blue-500">Loading reviews... ⏳</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.clientAvatarUrl || '/default-avatar.png'}
              alt={review.clientName || 'Client'}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{review.clientName || 'Anonymous'}</p>
              <p className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-2 text-yellow-500 text-sm">
            {'⭐'.repeat(review.rating)}{' '}
            <span className="text-gray-600 ml-2">({review.rating}/5)</span>
          </div>

          <p className="text-gray-700">{review.comment || 'No comment.'}</p>
        </div>
      ))}

      {reviews.length === 0 && (
        <div className="text-center text-gray-400 col-span-full">No reviews yet 💤</div>
      )}
    </div>
  );
};

export default ReviewsTab;
