import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  useEffect(() => {
    if (!isInView) {
      setDisplayedTitle('');
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      setDisplayedTitle(title.slice(0, i + 1)); 
      i++;
      if (i >= title.length) clearInterval(timer);
    }, 40);

    return () => clearInterval(timer);
  }, [isInView, title]);

  return (
    <motion.div
      ref={ref}
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span className="border-r-2 border-blue-500 pr-1 animate-pulse">{displayedTitle}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-lg md:text-xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium animate-gradient-x"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
