import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostDto } from '../../types/Post';

interface TopRatedPostModalProps {
  post: PostDto;
  onClose: () => void;
}

interface ProviderInfo {
  name: string;
  surname: string;
  avatarUrl?: string;
}

const TopRatedPostsModal = ({ post, onClose }: TopRatedPostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [providerInfo, setProviderInfo] = useState<ProviderInfo | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await fetch(`https://localhost:7164/api/ServiceProviderProfile/${post.serviceProviderProfileId}`);
        const json = await res.json();
        if (json.data) {
          setProviderInfo({
            name: json.data.name,
            surname: json.data.surname,
            avatarUrl: json.data.avatarUrl
          });
        }
      } catch (error) {
        console.error('Error loading provider profile:', error);
      }
    };

    fetchProvider();
  }, [post.serviceProviderProfileId]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[3px] flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="relative bg-gradient-to-br from-white/50 via-white/30 to-white/10 backdrop-blur-2xl rounded-3xl p-4 w-full max-w-4xl shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col md:flex-row"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-3xl text-gray-800 hover:text-red-500 transition-transform hover:scale-125"
          >
            &times;
          </button>

          {/* left */}
          <div className="md:w-1/2 flex flex-col items-center justify-start p-4 gap-4">
            {post.imageUrl && post.imageUrl !== 'string' && (
              <div className="w-full">
                {post.imageUrl.endsWith('.mp4') ? (
                  <video
                    controls
                    className="rounded-2xl border border-white/30 shadow-lg w-full max-h-[400px] object-contain"
                  >
                    <source src={post.imageUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="rounded-2xl border border-white/30 shadow-lg w-full max-h-[400px] object-contain"
                  />
                )}
              </div>
            )}

            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-black to-black text-transparent bg-clip-text">
                {post.title}
              </h2>
              <div className="flex items-center text-black gap-2">
                <span className="text-lg">❤️</span>
                <span className="text-md">{post.likesCount}</span>
              </div>
            </div>
          </div>

        {/* Right */}
        <div className="md:w-1/2 flex flex-col p-6 gap-6">

          {/* Provider */}
          {providerInfo && (
            <div className="flex flex-col gap-2">
              <div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => window.location.href = `/service-provider/${post.serviceProviderProfileId}`}
              >
                {providerInfo.avatarUrl && (
                  <img
                    src={providerInfo.avatarUrl}
                    alt={`${providerInfo.name} ${providerInfo.surname}`}
                    className="w-12 h-12 rounded-full border border-gray-400 group-hover:ring-2 group-hover:ring-cyan-500 transition-all"
                  />
                )}
                <div className="text-gray-900 text-2xl group-hover:text-cyan-600 transition-all">
                  <div className="font-semibold">{providerInfo.name} {providerInfo.surname}</div>
                </div>
              </div>

              <div className="border-b border-gray-300 my-2"></div>
            </div>
          )}


          {/* Description */}
          <p className="text-left text-gray-900 text-md md:text-lg leading-relaxed">
            {post.content}
          </p>

          {/* Date */}
          <div className="border-t mb-2 pt-4 text-xs text-gray-500 text-center">
            Created on: {new Date(post.createdAt).toLocaleString()}
          </div>

        </div>


        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TopRatedPostsModal;
