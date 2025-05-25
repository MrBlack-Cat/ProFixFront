
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserPosts from "../Components/UserPosts";

interface Post {
  id: number;
  serviceProviderProfileId: number;
  title: string;
  content: string;
  createdAt: string;
}

const PostsTab: React.FC = () => {
  const [userId, setUserId] = useState<number>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Post[]>(`https://localhost:7164/api/Post/PostList`);
        setPosts(response.data);
      } catch (err) {
        setError("Postlar yüklənərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  const fetchPosts = async () => {
    if (!userId) {
      setError("Lütfən, istifadəçi ID-sini daxil edin.");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Token tapılmadı. Yenidən login olun.");
        return;
      }

      const response = await axios.get<Post[]>(`https://localhost:7164/api/Post/GetPostsByProvider/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (err) {
      setError("Postlar yüklənərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, reason: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Token tapılmadı. Zəhmət olmasa yenidən login olun.");
        return;
      }

      await axios.delete(`https://localhost:7164/api/post/${id}?reason=${encodeURIComponent(reason)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      alert("Post uğurla silindi.");
    } catch (error) {
      console.error("Silinərkən xəta baş verdi:", error);
      alert("Post silinərkən xəta baş verdi.");
    }
  };
//yeni
  const handleUpdate = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Posts Tab</h2>
      <input
        type="number"
        placeholder="enter user ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        className="border p-2 rounded mb-4"
      />
      <button onClick={fetchPosts} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
        Search
      </button>

      {loading && <p>Yüklənir...</p>}
      {error && <p className="text-red-500">{error}</p>} 
      <UserPosts posts={posts} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
    //on update yeni elave eledim 
  );
};

export default PostsTab;
