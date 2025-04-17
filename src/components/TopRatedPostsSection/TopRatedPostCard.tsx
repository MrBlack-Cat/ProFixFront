import { motion } from 'framer-motion';
import { PostDto } from '../../types/Post';

interface TopRatedPostCardProps {
  post: PostDto;
  onClick: () => void;
}

const TopRatedPostCard = ({ post, onClick }: TopRatedPostCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {post.imageUrl && post.imageUrl !== 'string' ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-60 object-cover group-hover:opacity-90 transition-all duration-300"
        />
      ) : (
        <div className="w-full h-60 bg-gray-300 flex items-center justify-center text-gray-600">
          Нет изображения
        </div>
      )}
      <div className="p-3">
        <h3 className="text-md font-semibold truncate mb-1">{post.title}</h3>
        <p className="text-gray-500 text-xs line-clamp-2">{post.content}</p>
        <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2">
          <span>❤️ {post.likesCount}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TopRatedPostCard;
