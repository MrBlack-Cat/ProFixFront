import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  id: number;
  userName: string;
  comment: string;
  rating: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    axios.get("/api/reviews")
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Rəylər</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">İstifadəçi</th>
            <th className="border p-2">Şərh</th>
            <th className="border p-2">Reytinq</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td className="border p-2">{review.userName}</td>
              <td className="border p-2">{review.comment}</td>
              <td className="border p-2">{review.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
