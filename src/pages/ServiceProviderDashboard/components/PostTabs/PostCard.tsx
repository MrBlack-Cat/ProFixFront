import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content?: string;
    imageUrl?: string;
    createdAt: string;
    likesCount: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/20 rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 border border-gray-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Изображение */}
      <div className="relative h-48 w-full overflow-hidden">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">
            No Image
          </div>
        )}

        {/* Появляющиеся кнопки */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center gap-3 bg-black/30"
        >
          <button
            onClick={onEdit}
            className="bg-yellow-300 text-black text-xs px-3 py-1 rounded hover:bg-yellow-400 transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-400 text-black text-xs px-3 py-1 rounded hover:bg-red-500 transition"
          >
            🗑️ Delete
          </button>
        </motion.div>
      </div>

      {/* Контент */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-semibold truncate text-[#122E34]">{post.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-2 mt-1">{post.content || "No description"}</p>

        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2 border-t">
          <span>❤️ {post.likesCount}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
