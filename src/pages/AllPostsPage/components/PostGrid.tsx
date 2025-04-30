import { PostDto } from '../../../types/Post';
import PostCard from './PostCard';
import { motion } from 'framer-motion';

interface Props {
  posts: PostDto[];
  onSelect: (post: PostDto) => void;
}

const PostGrid = ({ posts, onSelect }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onClick={() => onSelect(post)} />
      ))}
    </motion.div>
  );
};

export default PostGrid;
