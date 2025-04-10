import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../utils/api';

interface AverageRatingProps {
  providerId: number;
}

const AverageRating: React.FC<AverageRatingProps> = ({ providerId }) => {
  const [average, setAverage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const res = await fetchWithAuth(`https://localhost:7164/api/Review/average-rating/${providerId}`);
        const json = await res.json();
        setAverage(json.data ?? 0);
      } catch (err) {
        console.error('Error fetching average rating:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAverage();
  }, [providerId]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= Math.round(rating) ? '⭐' : '☆'}
        </span>
      );
    }
    return stars;
  };

  if (loading) return <span className="text-gray-500">Loading...</span>;

  return (
    <div className="flex items-center gap-2">
      <div className="text-yellow-500 text-xl">
        {renderStars(average || 0)}
      </div>
      <span className="text-gray-700 font-medium text-sm">
        ({average?.toFixed(2)})
      </span>
    </div>
  );
};

export default AverageRating;
