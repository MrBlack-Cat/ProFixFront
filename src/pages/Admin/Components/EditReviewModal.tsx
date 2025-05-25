import React, { useState } from 'react';

const EditModal: React.FC<{
  review: any;
  onClose: () => void;
  onSave: (updatedReview: any) => void;
}> = ({ review, onClose, onSave }) => {
  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Review</h3>
        <label className="block mb-2">
          Comment:
          <textarea
            className="w-full p-2 border rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Rating:
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={rating}
            min={1}
            max={5}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Ləğv et
          </button>
          <button
            onClick={() => onSave({ ...review, comment, rating })}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
