// import React, { useEffect, useState } from 'react';
// import PostCard from './PostCard';
// import CreatePostForm from './CreatePostForm';
// import UpdatePostForm from './UpdatePostForm';
// import { fetchWithAuth } from '../../../utils/api';

// interface Post {
//   id: number;
//   title: string;
//   content?: string;
//   imageUrl?: string;
//   createdAt: string;
// }

// const PostsTab: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);


  
//   useEffect(() => {
//     fetchPosts();
//   }, []);
  
//   const fetchPosts = async () => {
//     try {
//       const res = await fetchWithAuth('https://localhost:7164/api/Post/provider');
//       const json = await res.json();      
//       setPosts(Array.isArray(json) ? json : []);
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       setError('Could not load posts 😢');
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleEdit = (post: Post) => {
//     setSelectedPost(post);
//     setShowEditModal(true);
//   };

//   const handleDelete = async (post: Post) => {
//     const reason = prompt(`Why are you deleting "${post.title}"? 🗑`);
//     if (!reason || reason.trim() === '') return;

//     const res = await fetchWithAuth(`https://localhost:7164/api/Post/${post.id}?Reason=${encodeURIComponent(reason)}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       alert('✅ Post deleted successfully!');
//       fetchPosts();
//     } else {
//       const json = await res.json();
//       alert('❌ Failed to delete post: ' + (json?.[0] || 'Unknown error'));
//     }
//   };

//   if (loading) return <div className="text-center text-blue-600">Loading posts... 📦</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <>
//       {/* ➕ Add Button */}
//       <div className="flex justify-end px-4 mt-2">
//         <button
//           onClick={() => setShowCreateModal(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           ➕ Add Post
//         </button>
//       </div>

//       {/* 🧱 Posts */}
//       {posts.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//           {posts.map((post) => (
//             <PostCard
//               key={post.id}
//               post={post}
//               onEdit={() => handleEdit(post)}
//               onDelete={() => handleDelete(post)}
//             />))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500 mt-6">No posts yet 💤</div>
//       )}

//       {/* 📥 Add Modal*/}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fade-in-up">
//             <button
//               onClick={() => setShowCreateModal(false)}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
//             >
//               ✖
//             </button>
//             <CreatePostForm
//               onSuccess={() => {
//                 setShowCreateModal(false);
//                 fetchPosts();
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* ✏️Update Modal */}
//       {showEditModal && selectedPost && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fade-in-up">
//             <button
//               onClick={() => setShowEditModal(false)}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
//             >
//               ✖
//             </button>
//             <UpdatePostForm
//               post={selectedPost}
//               onSuccess={() => {
//                 setShowEditModal(false);
//                 fetchPosts();
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PostsTab;


import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import CreatePostForm from './CreatePostForm';
import UpdatePostForm from './UpdatePostForm';
import { fetchWithAuth } from '../../../utils/api';

interface Post {
  id: number;
  title: string;
  content?: string;
  imageUrl?: string;
  createdAt: string;
}

interface PostsTabProps {
  providerId: number;
}

const PostsTab: React.FC<PostsTabProps> = ({ providerId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/Post/GetPostsByProvider/${providerId}`);
      const json = await res.json();
      setPosts(Array.isArray(json) ? json : json.data ?? []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Could not load posts 😢');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) fetchPosts();
  }, [providerId]);

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleDelete = async (post: Post) => {
    const reason = prompt(`Why are you deleting "${post.title}"? 🗑`);
    if (!reason || reason.trim() === '') return;

    const res = await fetchWithAuth(`https://localhost:7164/api/Post/${post.id}?Reason=${encodeURIComponent(reason)}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('✅ Post deleted successfully!');
      fetchPosts();
    } else {
      const json = await res.json();
      alert('❌ Failed to delete post: ' + (json?.[0] || 'Unknown error'));
    }
  };

  if (loading) return <div className="text-center text-blue-600">Loading posts... 📦</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="flex justify-end px-4 mt-2">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          ➕ Add Post
        </button>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-6">No posts yet 💤</div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fade-in-up">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✖
            </button>
            <CreatePostForm
              onSuccess={() => {
                setShowCreateModal(false);
                fetchPosts();
              }}
            />
          </div>
        </div>
      )}

      {showEditModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl animate-fade-in-up">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✖
            </button>
            <UpdatePostForm
              post={selectedPost}
              onSuccess={() => {
                setShowEditModal(false);
                fetchPosts();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostsTab;
