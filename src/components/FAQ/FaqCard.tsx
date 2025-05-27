import { motion } from 'framer-motion';

interface FaqCardProps {
  question: string;
  answer: string;
  index: number;
  isFlipped: boolean;
  onClick: () => void;
}

const FaqCard = ({ question, answer, index, isFlipped, onClick }: FaqCardProps) => {
  return (
    <motion.div
      className="relative w-full h-36 perspective select-none"
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full rounded-2xl border border-white/30 shadow-xl bg-white/30 backdrop-blur-md text-gray-900 font-semibold flex items-center justify-center text-center px-4 py-3"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {question}
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full rounded-2xl border border-white/30 shadow-xl bg-emerald-700 text-white font-medium flex items-center justify-center text-center px-4 py-3"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {answer}
        </div>
      </div>
    </motion.div>
  );
};

export default FaqCard;