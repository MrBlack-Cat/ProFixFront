import { useEffect, useState } from "react";
import { fetchTopServiceProviders } from "../../api/fetchTopServiceProviders";
import { ServiceProviderTopDto } from "../../types/ServiceProvider";
import TopServiceProvidersCard from "./TopServiceProvidersCard";
import { motion } from "framer-motion";
import SectionTitle from "../SectionTitle/SectionTitle";

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

  if (loading) return <p className="text-center text-gray-400">Loading top providers...</p>;

  return (
    <section id="top-providers" className="relative py-16 bg-gradient-to-tr from-[#bbf5fb] to-[#bbf5fb] flex flex-col items-center overflow-hidden">
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      {/* kontent */}
      <div className="relative z-10 max-w-7xl mx-auto px-1 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <SectionTitle
            title="Top Service Providers"
            subtitle="The highest-rated professionals of ProFix community."
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {providers.map((provider) => (
            <TopServiceProvidersCard key={provider.id} provider={provider} />
          ))}
        </motion.div>

        {/* View All Providers */}
        <div className="flex justify-center mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/service-providers"}
            className="px-6 py-2 rounded-full text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-[#3c9b92] to-[#04655e] hover:opacity-90 transition-all"
          >
            View All Providers
          </motion.button>
        </div>


      </div>
    </section>
  );
};

export default TopServiceProvidersSection;
