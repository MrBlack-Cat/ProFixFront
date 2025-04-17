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
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
      onClick={() => navigate(`/service-provider/${provider.id}`)}
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={provider.avatarUrl || "/default-avatar.png"}
          alt={`${provider.name} ${provider.surname}`}
          className="h-full w-full object-cover"
        />  
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg truncate">
          {provider.name} {provider.surname}
        </h3>
        <p className="text-gray-500 text-sm truncate">{provider.city || "Unknown City"}</p>
        <p className="text-gray-600 text-sm mt-1 truncate">
          {provider.parentCategoryName || "No Category"}
        </p>
        <p className="text-indigo-600 font-semibold mt-2">
          ⭐ {provider.averageRating.toFixed(1)}
        </p>
      </div>
    </motion.div>
  );
};

export default TopServiceProvidersCard;
