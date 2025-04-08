import SectionTitle from '../SectionTitle/SectionTitle';
import { motion } from 'framer-motion';
import aboutImg from '../../assets/about.svg'; // добавь иллюстрацию в папку assets

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-48 bg-gradient-to-b from-white to-blue-50"
      style={{
        backgroundImage: 'url(/assets/back8.avif', // Указан путь к изображению
        backgroundSize: 'cover', // Для покрытия всей секции
        backgroundPosition: 'center', // Центрирование изображения
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.9 }}
        >
          <SectionTitle title="What is ProFix?" />
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mt-4">
            <span className="font-semibold text-blue-600">ProFix</span> is a friendly freelance platform that brings together talented professionals and awesome clients.
            Whether you need design, development, or content creation — we're here to make work feel fun, flexible, and productive.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#services"
            className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Explore Services
          </motion.a>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
          className="flex justify-center"
        >
          <img
            src={aboutImg}
            alt="Team working illustration"
            className="w-full max-w-md drop-shadow-2xl rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
