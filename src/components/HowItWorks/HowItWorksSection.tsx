import { motion } from 'framer-motion';
import HowItWorksCard from './HowItWorksCard'; // Импортируем карточку

// Массив шагов
const steps = [
  {
    title: "1. Sign Up",
    description: "Create your ProFix account in just a few clicks and join our amazing community.",
    imageUrl: "/assets/signup1.png",
  },
  {
    title: "2. Find Services",
    description: "Browse categories or search to find the perfect freelancer or provider for your project.",
    imageUrl: "/assets/find1.png",
  },
  {
    title: "3. Connect & Work",
    description: "Chat, hire, and collaborate smoothly. Get your project done by top-rated professionals.",
    imageUrl: "/assets/handshake1.webp",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-tr from-[#396a70] to-[#bea6c2] overflow-hidden flex flex-col items-center">
      {/* Альбомный слой */}
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      {/* Контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#122E34] mb-12"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <HowItWorksCard
              key={index}
              title={step.title}
              description={step.description}
              imageUrl={step.imageUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
