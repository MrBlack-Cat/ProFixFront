import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ServiceProviderTopDto } from "../../types/ServiceProvider";

interface Props {
  provider: ServiceProviderTopDto;
}

const TopServiceProvidersCard = ({ provider }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden flex flex-col"
      onClick={() => navigate(`/service-provider/${provider.id}`)}
    >
      <div className="h-40 w-full overflow-hidden rounded-t-2xl">
        <img
          src={provider.avatarUrl || "/default-avatar.png"}
          alt={`${provider.name} ${provider.surname}`}
          className="h-full w-full object-cover"
        />  
      </div>

      <div className="p-2 flex flex-col justify-between flex-grow">
        <h3 className="font-bold text-lg text-[#122E34] truncate">
          {provider.name} {provider.surname}
        </h3>
        <p className="text-cyan-700 text-sm truncate">{provider.city || "Unknown City"}</p>
        <p className="text-cyan-800 text-base mt-1 truncate">
          {provider.parentCategoryName || "No Category"}
        </p>
        <p className="text-emerald-800 font-semibold mt-2">
          ⭐ {provider.averageRating.toFixed(1)}
        </p>
      </div>
    </motion.div>
  );
};

export default TopServiceProvidersCard;
