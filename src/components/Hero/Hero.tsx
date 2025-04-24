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
      controls.start({ scale: 0.9, opacity: 0, y: 60 });
    }
  }, [inView, controls]);

  return (
    <section
      className="relative h-screen flex items-center justify-center pt-24 overflow-hidden"
      id="hero"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/hero_background_video.mp4" 
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <motion.div
        ref={ref}
        animate={controls}
        initial={{ scale: 0.8, opacity: 0, y: 60 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-20 text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-48"
        >
          Freelancers for Any Job. Anytime.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0, textShadow: "0px 0px 12px cyan" } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-cyan-300 mb-8 max-w-2xl mx-auto"
        >
          ProFix is your go-to freelance platform for design, development, content, and more.
        </motion.p>


        <motion.a
          animate={{
            boxShadow: [
              '0px 0px 15px rgba(0,255,255,0.5)',
              '0px 0px 25px rgba(0,255,255,0.8)',
              '0px 0px 15px rgba(0,255,255,0.5)',
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.50,
            textShadow: '0px 0px 8px rgba(0, 255, 255, 0.8)',
            boxShadow: '0px 0px 30px rgba(0, 255, 255, 0.6), 0px 0px 50px rgba(255, 0, 255, 0.4)',
          }}
          href="#services"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-800 to-purple-600 text-white rounded-2xl text-xl font-semibold transition-all duration-300 ease-in-out transform"
        >
          Explore Services
        </motion.a>

      </motion.div>
    </section>
  );
};

export default Hero;
