import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import heroImg1 from '../../assets/hero-image1.png';
import heroImg2 from '../../assets/hero-image2.png';
import heroImg3 from '../../assets/hero-image3.png';

const slides = [
  {
    img: heroImg1,
    title: 'Freelancers For Any Job. Anytime.',
    description: 'ProFix connects you with the best service providers in the easiest way.',
  },
  {
    img: heroImg2,
    title: 'Grow Your Projects With Us.',
    description: 'Find experts ready to bring your ideas to life efficiently and affordably.',
  },
  {
    img: heroImg3,
    title: 'Top Service. Top Talent.',
    description: 'Our professionals are carefully selected to ensure high-quality delivery.',
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      slideTo(current + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const slideTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent((index + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#5e959c] to-[#bea6c2] flex items-center justify-center overflow-hidden">
      <div className="absolute top-[10%] left-[5%] w-[90%] h-[88%] bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-16 min-h-[600px]">

        {/* Left - Text */}
        <div className="relative flex flex-col justify-center h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current + '-text'}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#122E34] leading-tight mb-6">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl text-[#57707A] mb-8">
                {slides[current].description}
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="inline-block px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-[#0A7075] to-[#622347] transition-all"
              >
                Explore More
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* KRight Photo */}
        <div className="relative flex justify-center items-center h-[400px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={current + '-image'}
              src={slides[current].img}
              alt="Slide visual"
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="absolute w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </AnimatePresence>
        </div>

      </div>

      <div className="absolute bottom-10 flex space-x-4 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => slideTo(index)}
            aria-label={`Slide ${index + 1}`}
            className={`w-4 h-4 rounded-full ${
              current === index ? 'bg-[#0C969C]' : 'bg-white/50'
            } transition-all duration-300`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
