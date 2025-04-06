import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, opacity: 1, y: 0 });
    } else {
      controls.start({ scale: 0.8, opacity: 0, y: 60 });
    }
  }, [inView, controls]);

  return (
    <section
      className="h-screen flex items-center justify-center pt-24 bg-cover bg-center shadow-lg"
      style={{
        backgroundImage: 'url(/public/back4.jpg)', 
      }}
      id="hero"
    >
      <motion.div
        ref={ref}
        animate={controls}
        initial={{ scale: 0.8, opacity: 0, y: 60 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6"
        >
          Freelancers for Any Job. Anytime.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
        >
          ProFix is your go-to freelance platform for design, development, content, and more.
        </motion.p>
        <motion.a
          whileHover={{
            scale: 2.5,
            rotate: 360,
            textShadow: '0px 0px 8px rgba(255, 255, 255, 0.8)', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
            transition: { type: 'spring', stiffness: 64, damping: 2040 }
          }}
          whileTap={{
            scale: 0.5,
            rotate: -360,
            textShadow: '0px 0px 12px rgba(255, 255, 255, 0.9)', 
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)',
            transition: { type: 'spring', stiffness: 64, damping: 2040 }
          }}
          href="#services"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl text-lg hover:bg-gradient-to-l hover:from-blue-700 hover:to-green-700 transition-all duration-300 ease-in-out transform"
        >
          Explore Services
        </motion.a>

      </motion.div>
    </section>
  );
};

export default Hero;
