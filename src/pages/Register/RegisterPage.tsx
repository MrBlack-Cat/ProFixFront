import { motion } from 'framer-motion';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
<section
  className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
  style={{
    backgroundImage: "url('/assets/regback5.jpg')",
  }}
>
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-900 via-purple-900 to-pink-900 opacity-20"></div>

      {/* Animated Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 w-[400px] shadow-2xl"
      >
      <motion.h2
        className="text-5xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2 tracking-widest drop-shadow-1xl"
        initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
      >
        Join To ProFix
      </motion.h2>


        <RegisterForm />
      </motion.div>
    </section>
  );
};

export default RegisterPage;
