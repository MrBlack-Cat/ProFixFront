import { motion } from 'framer-motion';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <motion.div
        className="bg-white rounded-xl shadow-xl p-8 w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Register</h2>
        <RegisterForm />
      </motion.div>
    </section>
  );
};

export default RegisterPage;
