import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Props {
  step: string;
  text: string;
  direction?: 'left' | 'right';
}

const StepCard = ({ step, text, direction = 'left' }: Props) => {
  const xInitial = direction === 'left' ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: xInitial, rotateY: -10 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      whileHover={{ scale: 1.04, rotateZ: 1 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      viewport={{ once: false, amount: 0.1 }}
      className="relative p-6 rounded-xl bg-white shadow-xl border border-transparent group transition-all duration-500 glow-border"
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
        viewport={{ once: false, amount: 0.9 }} 
        className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-100 rounded-full p-1 z-10"
      >
        <CheckCircle className="text-blue-600 w-8 h-8" />
      </motion.div>

      <h3 className="text-blue-600 text-2xl font-bold mb-2 mt-4">{step}</h3>
      <p className="text-gray-700">{text}</p>

      <motion.div
        layoutId="underline"
        className="mt-4 h-1 w-16 bg-blue-600 rounded-full group-hover:w-24 transition-all"
      />
    </motion.div>
  );
};

export default StepCard;
