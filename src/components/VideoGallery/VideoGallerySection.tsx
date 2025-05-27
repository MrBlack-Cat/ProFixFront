import { motion } from 'framer-motion';
import { useState } from 'react';

interface VideoItem {
  src: string;
  title: string;
  description: string;
}

const VideoGallerySection = () => {
  const [videos] = useState<VideoItem[]>([
    { src: '/assets/videos/video1.mp4', title: 'Save time', description: 'Solve your problem' },
    { src: '/assets/videos/video6.mp4', title: 'Build your', description: 'Dreams with us' },
    { src: '/assets/videos/video3.mp4', title: 'Learn from', description: 'Your mistakes.' },
    { src: '/assets/videos/video4.mp4', title: 'Title', description: 'With us' },
    { src: '/assets/videos/video12.mp4', title: 'Contract with us', description: 'Insures you' },
    { src: '/assets/videos/video13.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video9.mp4', title: 'Likes', description: 'Are your ads' },
    { src: '/assets/videos/video11.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video5.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video2.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video15.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video6.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video7.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video8.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video14.mp4', title: 'Title', description: 'Description' },
    { src: '/assets/videos/video10.mp4', title: 'Title', description: 'Description' },
  ]);

  return (
    <section id="gallery" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-extrabold text-white text-center mb-16 tracking-tight">
          Our Dynamic Gallery
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              className="relative group rounded-xl overflow-hidden shadow-lg p-[3px] bg-gradient-to-br from-cyan-400/30 to-purple-500/30 hover:from-pink-500 hover:to-indigo-500 transition-all duration-500"
            >
              <div className="relative overflow-hidden rounded-xl">
                {/* Video */}
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover aspect-[16/9] sm:aspect-[4/5] md:aspect-[16/9] rounded-xl"
                />

                {/* Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out p-6 rounded-xl">
                  <h3 className="text-white text-lg md:text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {video.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {video.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallerySection;
