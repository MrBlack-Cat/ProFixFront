import { motion } from 'framer-motion';

interface HowItWorksCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

const HowItWorksCard = ({ title, description, imageUrl, index }: HowItWorksCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-all duration-500 overflow-visible"
    >
      {/* Photo */}
      <div className="absolute -top-12 w-32 h-32">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Kontent */}
      <div className="mt-16 flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#122E34] mb-4">{title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default HowItWorksCard;
