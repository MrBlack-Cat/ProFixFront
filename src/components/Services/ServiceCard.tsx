import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  icon: string;
  category: string;
  serviceTypes: string[];
}

const ServiceCard = ({ id, icon, category, serviceTypes }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${id}`); 
  };

  return (
    <motion.div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="perspective cursor-pointer w-full"
    >
      <div
        className={`relative w-full h-64 bg-white rounded-xl shadow-md transition-transform duration-700 transform-style preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 p-4 backface-hidden flex flex-col justify-between">
          <div className="text-3xl">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 mt-2">{category}</h3>
          <ul className="text-sm text-gray-600 mt-4 space-y-1">
            {serviceTypes.slice(0, 4).map((type, idx) => (
              <li key={idx}>• {type}</li>
            ))}
          </ul>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-blue-600 text-white rounded-xl">
          <p className="text-center font-semibold text-sm">Explore {category} 🚀</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
