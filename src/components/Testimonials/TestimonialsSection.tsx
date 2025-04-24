import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  avatarUrl?: string;
  feedback: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Emily Johnson",
    avatarUrl: "/assets/client3.webp",
    feedback: "ProFix completely transformed the way I find help for my projects. Highly recommend!",
    rating: 5,
  },
  {
    name: "Michael Brown",
    avatarUrl: "/assets/client4.png",
    feedback: "Professional, fast, and reliable service providers on this platform.",
    rating: 4,
  },
  {
    name: "Sarah Williams",
    avatarUrl: "/assets/client7.png",
    feedback: "Loved the whole experience. Easy to navigate and great communication!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-tr from-[#396a70] to-[#bea6c2] overflow-hidden flex flex-col items-center">
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#122E34] mb-12"
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 pt-16 flex flex-col items-center text-center overflow-visible"
            >
              {/* Плавающий аватар */}
              <div className="absolute -top-24 w-60 h-60">
                <motion.img
                    src={testimonial.avatarUrl || "/assets/default-avatar.png"}
                    alt={testimonial.name}
                    className="w-60 h-60 object-contain rounded-3xl"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.5 }}
                />
                </div>


              {/* Контент */}
              <h3 className="text-lg font-bold text-[#122E34] mt-10">{testimonial.name}</h3>
              <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                {testimonial.feedback}
              </p>

              <div className="flex gap-1 text-yellow-400 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
