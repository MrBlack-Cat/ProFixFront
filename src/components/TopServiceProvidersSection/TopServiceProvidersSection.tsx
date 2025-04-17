import { useEffect, useState } from "react";
import { fetchTopServiceProviders } from "../../api/fetchTopServiceProviders";
import { ServiceProviderTopDto } from "../../types/ServiceProvider";
import TopServiceProvidersCard from "./TopServiceProvidersCard";
import { motion } from "framer-motion";

const TopServiceProvidersSection = () => {
  const [providers, setProviders] = useState<ServiceProviderTopDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const data = await fetchTopServiceProviders();
        setProviders(data);
      } catch (error) {
        console.error("❌ Error loading top providers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading top providers...</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Top Service Providers
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {providers.map((provider) => (
          <TopServiceProvidersCard key={provider.id} provider={provider} />
        ))}
      </div>
    </section>
  );
};

export default TopServiceProvidersSection;
