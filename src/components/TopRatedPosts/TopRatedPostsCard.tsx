import { motion } from 'framer-motion';
import { PostDto } from '../../types/Post';

interface TopRatedPostCardProps {
  post: PostDto;
  onClick: () => void;
}

const TopRatedPostsCard = ({ post, onClick }: TopRatedPostCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden flex flex-col"
      onClick={onClick}
    >
      {post.imageUrl && post.imageUrl !== 'string' ? (
        <div className="h-48 w-full overflow-hidden rounded-t-2xl">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-gray-300 flex items-center justify-center text-gray-600 rounded-t-2xl">
          No Image
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-md text-[#122E34] truncate mb-1">{post.title}</h3>
        <p className="text-cyan-700 text-xs line-clamp-2">{post.content}</p>
        <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
          <span>❤️ {post.likesCount}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TopRatedPostsCard;
