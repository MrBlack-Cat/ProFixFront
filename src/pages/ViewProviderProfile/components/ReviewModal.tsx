import { useState } from 'react';
import Modal from 'react-modal';
import ReactStars from 'react-stars';


Modal.setAppElement('#root');

interface ReviewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  providerId: number;
  token: string;
}

const ReviewModal = ({
  isOpen,
  onRequestClose,
  providerId,
  token,
}: ReviewModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('⭐ Please select a rating before submitting.');
      return;
    }

    const reviewData = {
      serviceProviderProfileId: providerId,
      rating,
      comment,
    };

    try {
      const response = await fetch('https://localhost:7164/api/Review/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (data.isSuccess) {
        alert('✅ Review sent successfully!');
        onRequestClose();
        setRating(0);
        setComment('');
      } else {
        alert('⚠️ Error: ' + (data.errors?.join(', ') || 'Something went wrong'));
      }
    } catch (error) {
      console.error('❌ Review submit error:', error);
      alert('❌ Failed to send review.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Leave a Review"
      className="bg-white p-6 rounded shadow max-w-lg mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
    >
      <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>

      <label className="block mb-2 font-medium">Rating:</label>
      <ReactStars
        count={5}
        onChange={(newRating: number) => setRating(newRating)}
        size={32}
        value={rating}
        half={false}
        color2={'#ffd700'}
      />

      <label className="block mt-4 mb-2 font-medium">Comment:</label>
      <textarea
        className="w-full p-2 border rounded"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default ReviewModal;
