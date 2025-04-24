import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  icon: string;
  category: string;
  serviceTypes: string[];
  index: number;
}

const ServiceCard = ({ id, icon, category, serviceTypes, index }: Props) => {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  return (
    <div
      onClick={() => navigate(`/category/${id}`)}
      className={`cursor-pointer flex rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 
      ${isEven ? 'bg-white/30' : 'bg-white/20'} backdrop-blur-md h-32`}
    >
      {/* Левая часть */}
      <div className="w-2/5 flex flex-col justify-center items-center bg-white/30 p-4">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-md font-bold text-[#122E34] text-center">{category}</div>
      </div>

      {/* Правая часть */}
      <div className="w-3/5 flex flex-col justify-center p-4 bg-white/10">
        <ul className="text-sm text-[#0A7075] space-y-1">
          {serviceTypes.slice(0, 4).map((type, idx) => (
            <li key={idx}>• {type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
