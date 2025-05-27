import { PostDto } from '../../../types/Post';
import GlassModal from '../../../components/Glassmorphism/GlassModal';
import { useEffect, useState } from 'react';
import { t } from 'i18next';

interface Props {
  post: PostDto;
  onClose: () => void;
}

interface ProviderInfo {
  name: string;
  surname: string;
  avatarUrl?: string;
}

const PostModal = ({ post, onClose }: Props) => {
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
        console.error('Error loading provider profile: ', error);
      }
    };

    fetchProvider();
  }, [post.serviceProviderProfileId]);

  return (
    <GlassModal isOpen={true} onClose={onClose}>
      <div className="flex flex-col md:flex-row gap-8 max-h-[80vh] overflow-y-auto">
        {/* Left, photo video */}
        <div className="md:w-1/2">
          {post.imageUrl && post.imageUrl !== 'string' && (
            <div className="w-full">
              {post.imageUrl.endsWith('.mp4') ? (
                <video
                  controls
                  className="rounded-2xl border border-white/30 shadow-lg w-full max-h-[400px] object-contain"
                >
                  <source src={post.imageUrl} type="video/mp4" />
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

          <h2 className="mt-4 text-2xl font-bold text-emerald-100">{post.title}</h2>
          <div className="text-gray-600 text-sm">❤️ {post.likesCount}</div>
        </div>

        {/* Right Info kontent */}
        <div className="md:w-1/2">
          {providerInfo && (
            <div
              className="flex items-center gap-4 cursor-pointer group mb-4"
              onClick={() => window.location.href = `/service-provider/${post.serviceProviderProfileId}`}
            >
              {providerInfo.avatarUrl && (
                <img
                  src={providerInfo.avatarUrl}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border border-gray-400 group-hover:ring-2 group-hover:ring-cyan-500 transition"
                />
              )}
              <div className="text-xl font-semibold text-gray-200 group-hover:text-cyan-600 transition">
                {providerInfo.name} {providerInfo.surname}
              </div>
            </div>
          )}

          <p className="text-gray-100 whitespace-pre-line mb-4">
            {post.content}
          </p>

          <div className="text-xs text-gray-500 border-t pt-2">
          {t('created')}: {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </GlassModal>
  );
};

export default PostModal;
