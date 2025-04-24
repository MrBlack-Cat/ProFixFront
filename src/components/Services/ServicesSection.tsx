import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { useNavigate } from 'react-router-dom';

interface ServiceType {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  serviceTypes: ServiceType[];
}

const ServicesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('https://localhost:7164/api/ParentCategory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const parentData = await res.json();

      if (parentData?.data) {
        const enriched = await Promise.all(
          parentData.data.map(async (parent: any) => {
            const typeRes = await fetch(`https://localhost:7164/api/ServiceType/by-category/${parent.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const types = await typeRes.json();
            return {
              id: parent.id,
              name: parent.name,
              icon: '🛠️',
              serviceTypes: types?.data || [],
            };
          })
        );
        setCategories(enriched);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="services" className="relative py-16 bg-gradient-to-tr from-[#396a70] to-[#bea6c2] flex flex-col items-center overflow-hidden">
      {/* Альбомный слой */}
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      {/* Контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-2 w-full">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#122E34] mb-4">
            Browse All Categories
          </h2>
          <p className="text-lg text-[#57707A]">
            Find top freelancers in every service category you need.
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.slice(0, 16).map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            >
              <ServiceCard
                id={cat.id}
                icon={cat.icon}
                category={cat.name}
                serviceTypes={cat.serviceTypes.map(st => st.name)}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Кнопка View All */}
        <div className="flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/all-categories')}
            className="px-4 py-2 rounded-full text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-[#3c9b92] to-[#04655e] transition-all"
          >
            View All Categories
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
