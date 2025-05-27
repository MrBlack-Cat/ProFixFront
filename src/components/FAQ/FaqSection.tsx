import { motion } from 'framer-motion';
import { useState } from 'react';
import FaqCard from './FaqCard.tsx';

const faqs = [
  { question: 'How do I join ProFix?', answer: 'Just sign up with your email and start exploring services.' },
  { question: 'Is ProFix free to use?', answer: 'Yes, signing up and browsing services is completely free.' },
  { question: 'Can I offer my own services?', answer: 'Absolutely! Create a profile and list your offerings.' },
  { question: 'How do I contact a service provider?', answer: 'You can use our built-in chat system to reach out instantly.' },
  { question: 'What types of jobs are on ProFix?', answer: 'From tech and design to home repair and tutoring — we cover it all!' },
  { question: 'Is there a review system?', answer: 'Yes, both clients and providers can leave reviews after completion.' },
  { question: 'How do I ensure secure payments?', answer: 'All payments are handled securely through our platform.' },
  { question: 'Can I report inappropriate behavior?', answer: 'Yes, use the complaint feature in the footer to report issues.' }
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
        <section className="relative py-10 bg-gradient-to-br from-[#bbf5fb] to-[#bbf5fb] px-4 overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-black text-center mb-4"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {faqs.map((faq, i) => (
            <FaqCard
              key={i}
              index={i}
              question={faq.question}
              answer={faq.answer}
              isFlipped={activeIndex === i}
              onClick={() => handleFlip(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
