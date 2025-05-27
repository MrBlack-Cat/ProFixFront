import React, { useEffect, useState } from "react";
import axios from "axios";
import EditReviewModal from "../Components/EditReviewModal"; // Import your EditReviewModal component


const ReviewTab: React.FC = () => {
  const [reviewId, setReviewId] = useState<number | string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //yeni elave
  const [editingReview, setEditingReview] = useState<any | null>(null);

  

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError("Token tapılmadı. Yenidən login olun.");
        return;
      }

      const response = await axios.get(`https://localhost:7164/api/Review/ListOfReviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews(response.data && response.data.data);
    } catch (err) {
      setError("Bütün review-lar yüklənərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsByProfileId = async () => {
    if (!reviewId) {
      fetchAllReviews();
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError("Token tapılmadı. Yenidən login olun.");
        return;
      }

      const response = await axios.get(`https://localhost:7164/api/Review/by-provider/${reviewId}
`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("bizim datalar:", response.data); // Debugging üçün log
      const reviewData = response.data?.data;

      if(!reviewData || Object.keys(reviewData).length === 0) {
        setReviews([]); 
        setError("Seçilən ID-yə uyğun review tapılmadı.");  }
      setReviews(response.data.data);

    } catch (err) {
      setError("Invalid Id");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  
  
  const handleDelete = async (id: number, reason: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Token tapılmadı. Zəhmət olmasa yenidən login olun.");
        return;
      }

      await axios.delete(`https://localhost:7164/api/Review/${id}?reason=${encodeURIComponent(reason)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      alert("Review uğurla silindi.");
    } catch (error) {
      console.error("Silinərkən xəta baş verdi:", error);
      alert("Review silinərkən xəta baş verdi.");
    }
  };

  

//yeni elave eledim 
  const handleEdit = (review: any) => {
    setEditingReview(review);
  };


  const handleSaveEdit = async (updatedReview: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Token tapılmadı.");
        return;
      }
  
      await axios.put(
        `https://localhost:7164/api/Review/Update/${updatedReview.id}`,
        {
          rating: updatedReview.rating,
          comment: updatedReview.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setReviews((prev) =>
        prev.map((r) => (r.id === updatedReview.id ? updatedReview : r))
      );
  
      alert("Review uğurla yeniləndi.");
      setEditingReview(null);
    } catch (error) {
      console.error("Yenilənmə zamanı xəta baş verdi:", error);
      alert("Review yenilənərkən xəta baş verdi.");
    }
  };
  
  


  return (
    <div>
      <h2 className="text-x1 font-bold mb-4">Reviews</h2>

      <div className="my-4 flex items-center">
        <input
          type="number"
          placeholder="Service Provider Profile ID daxil edin"
          value={reviewId}
          onChange={(e) => setReviewId(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={fetchReviewsByProfileId}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Yüklənir...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="mt-4 overflow-x-auto">
        {reviews && reviews.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr >
                <th className="p-4 text-left font-semibold">ID</th>
                <th className="p-4 text-left font-semibold">Client Profile Id</th>
                <th className="p-4 text-left font-semibold">Service Provider Profile ID</th>
                <th className="p-4 text-left font-semibold">Comment</th>
                <th className="p-4 text-left font-semibold">Rating</th>
                <th className="p-4 text-left font-semibold">Created At</th>
                <th className="p-4 text-left font-semibold">Actions</th> {/* <-- Action kolon */}
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-100 transition-colors">
                  <td className="p-4 border-b">{review.id}</td>
                  <td className="p-4 border-b">{review.clientProfileId}</td>
                  <td className="p-4 border-b">{review.serviceProviderProfileId}</td>
                  <td className="p-4 border-b">{review.comment}</td>
                  <td className="p-4 border-b">{review.rating}</td>
                  <td className="p-4 border-b">{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 border-b flex space-x-2">
                    <button
                      onClick={() => {
                        const reason = window.prompt("Niyə bu review-u silmək istəyirsiniz?");
                        if (reason && reason.trim() !== "") {
                          handleDelete(review.id, reason);
                        } else {
                          alert("Silinmə səbəbi göstərilməlidir.");
                        }
                      }}
                      
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                    >
                      
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(review)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>Review tapılmadı.</p>
        )}
      </div>

      {/* Redaktə modalı çağırılır */}
      {editingReview && (
        <EditReviewModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ReviewTab;
