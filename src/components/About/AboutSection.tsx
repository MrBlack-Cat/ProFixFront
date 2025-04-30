import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 bg-gradient-to-bl from-[#bea6c2] to-[#6cbcc7] flex items-center justify-center overflow-hidden">
      {/* Albom */}
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-16 min-h-[500px]">
        
        {/*Left */}
        <div className="relative flex justify-center items-center h-[400px] w-full overflow-hidden">
          <motion.img
            alt="About ProFix"
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md h-auto rounded-2xl shadow-2xl object-cover"
          />
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center h-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#122E34] leading-tight mb-6">
            What is ProFix?
          </h2>
          <p className="text-lg md:text-xl text-[#57707A] leading-relaxed">
            <span className="text-[#0C969C] font-bold">ProFix</span> is a platform designed to connect clients with talented service providers. 
            We simplify the service discovery process, streamline bookings, and ensure top-quality work through a professional and trusted network.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
