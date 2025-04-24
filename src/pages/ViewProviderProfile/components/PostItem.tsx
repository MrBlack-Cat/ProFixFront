import { useState } from 'react';
import { PostDto } from '../../../types/Post';
import { fetchWithAuth } from '../../../utils/api';
import PostModal from './PostModal'; 

interface Props {
  post: PostDto;
}

const PostItem = ({ post }: Props) => {
  const [likes, setLikes] = useState(post.likesCount);
  const [liked, setLiked] = useState(post.hasLiked);
  const [showModal, setShowModal] = useState(false);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    try {
      if (liked) {
        await fetchWithAuth(`https://localhost:7164/api/PostLike/${post.id}/unlike`, {
          method: 'DELETE',
        });
        setLikes((prev) => prev - 1);
      } else {
        await fetchWithAuth(`https://localhost:7164/api/PostLike/${post.id}/like`, {
          method: 'POST',
        });
        setLikes((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error('❌ Error when switching likes:', err);
    }
  };

  return (
    <>
      <div
        className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <h3 className="text-xl font-bold text-white/90 mb-1">{post.title}</h3>

        <p className="text-sm text-white/70 mt-1 line-clamp-2">{post.content}</p>

        {post.imageUrl && post.imageUrl !== 'string' && (
          <img
            src={post.imageUrl}
            alt="Post"
            className="mt-3 w-full h-48 object-cover rounded-xl border border-white/10 shadow-lg"
          />
        )}

        <div className="flex justify-between items-center mt-4 text-sm text-white/80">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <div className="flex items-center gap-1" onClick={handleLikeToggle}>
            <button className="text-2xl hover:scale-110 transition-transform">
              {liked ? '❤️' : '🤍'}
            </button>
            <span className="text-sm">{likes}</span>
          </div>
        </div>

        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {showModal && <PostModal post={post} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default PostItem;
