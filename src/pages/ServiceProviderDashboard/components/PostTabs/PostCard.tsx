import React from 'react';

interface PostCardProps {
    post: {
      id: number;
      title: string;
      content?: string;
      imageUrl?: string;
      createdAt: string;
    };
    onEdit: () => void;
    onDelete: () => void;

  }
  
  const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
    return (
      <div className="bg-white shadow-md rounded-md p-4 relative">
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p className="text-gray-600 mt-2">{post.content}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post" className="w-full mt-3 rounded" />
        )}
        <div className="flex justify-end mt-4 space-x-3">
  <button
    onClick={onEdit}
    className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-800 border border-yellow-500 hover:border-yellow-600 px-3 py-1 rounded transition duration-200"
  >
    ✏️ <span>Edit</span>
  </button>

  <button
    onClick={onDelete}
    className="flex items-center gap-1 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition duration-200"
  >
    🗑 <span>Delete</span>
  </button>
</div>

      </div>
    );
  };
  
  export default PostCard;
  