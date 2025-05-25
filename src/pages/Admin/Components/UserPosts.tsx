
// import React from "react";

// interface Post {
//   id: number;
//   serviceProviderProfileId: number;
//   title: string;
//   content: string;
//   createdAt: string;
// }

// interface Props {
//   posts: Post[];
//   onDelete: (id: number, reason: string) => void;
// }

// const UserPosts: React.FC<Props> = ({ posts, onDelete }) => {
//   if (!Array.isArray(posts) || posts.length === 0) {
//     return <p className="text-center text-gray-500">Post tapılmadı</p>;
//   }

//   const handleEdit = (id: number) => {
//     console.log("Edit post:", id);
//   };

//   const handleDelete = (id: number) => {
//     const reason = prompt("Zəhmət olmasa, silmə səbəbini yazın:");
//     if (reason) {
//       onDelete(id, reason);
//     }
//   };

//   return (
//     <div className="mt-6 overflow-x-auto">
//       <h3 className="text-2xl font-bold mb-4 text-center">Postlar</h3>
//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//           <tr>
//             <th className="py-3 px-6">Id</th>
//             <th className="py-3 px-6">ServiceProviderId</th>
//             <th className="py-3 px-6">Title</th>
//             <th className="py-3 px-6">Content</th>
//             <th className="py-3 px-6">Created At</th>
//             <th className="py-3 px-6">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {posts.map((post) => (
//             <tr key={post.id} className="hover:bg-gray-50 transition">
//               <td className="px-6 py-4">{post.id}</td>
//               <td className="px-6 py-4">{post.serviceProviderProfileId}</td>
//               <td className="px-6 py-4">{post.title}</td>
//               <td className="px-6 py-4 max-w-[200px] truncate">{post.content}</td>
//               <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString()}</td>
//               <td className="px-6 py-4 flex gap-2">
//                 <button
//                   onClick={() => handleDelete(post.id)}
//                   className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleEdit(post.id)}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserPosts;
import React, { useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  serviceProviderProfileId: number;
  title: string;
  content: string;
  createdAt: string;
}

interface Props {
  posts: Post[];
  onDelete: (id: number, reason: string) => void;
  onUpdate: (updatedPost: Post) => void;
}

const UserPosts: React.FC<Props> = ({ posts, onDelete, onUpdate }) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleSaveEdit = async () => {
    if (!editingPost) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Token tapılmadı. Yenidən login olun.");
      return;
    }

    const updatedPost = {
      ...editingPost,
      title: editedTitle,
      content: editedContent,
    };

    try {
      await axios.put(`https://localhost:7164/api/Post/${editingPost.id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdate(updatedPost); // parentə bildir ki, dəyişiklik etsin
      setEditingPost(null);
    } catch (error) {
      alert("Redaktə zamanı xəta baş verdi.");
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p className="text-center text-gray-500">Post tapılmadı</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Postlar</h3>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <tr>
            <th className="py-3 px-6">Id</th>
            <th className="py-3 px-6">ServiceProviderId</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Content</th>
            <th className="py-3 px-6">Created At</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{post.id}</td>
              <td className="px-6 py-4">{post.serviceProviderProfileId}</td>
              <td className="px-6 py-4">{post.title}</td>
              <td className="px-6 py-4 max-w-[200px] truncate">{post.content}</td>
              <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => onDelete(post.id, "Redaktə səbəbi")}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all"
                >
                  Delete
                </button>
                {/* <button
                  onClick={() => handleEditClick(post)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all"
                >
                  Edit
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingPost && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Post Redaktə Et</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border p-2 mb-2 rounded"
              placeholder="Title"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
              placeholder="Content"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Ləğv et
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
