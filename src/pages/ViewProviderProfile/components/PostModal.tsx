import React from 'react';
import { PostDto } from '../../../types/Post';

interface PostModalProps {
  post: PostDto;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative bg-[#1a1a2e] rounded-2xl p-6 w-full max-w-3xl shadow-2xl text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-white hover:text-red-500 transition"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
          {post.title}
        </h2>

        {post.imageUrl && post.imageUrl !== 'string' && (
          <img
            src={post.imageUrl}
            alt="Post"
            className="rounded-xl border border-white/20 shadow mb-4 w-full max-h-[400px] object-contain"
          />
        )}

        <p className="text-white text-md leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        <div className="mt-6 text-sm text-gray-400">
          <span>Created at: {new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
