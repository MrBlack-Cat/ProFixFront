import React from 'react';
import { ServiceProvider } from '../../types/category';
import ProviderCard from './ProviderCard';
import { motion } from 'framer-motion';

const ProvidersGrid: React.FC<{ providers: ServiceProvider[] }> = ({ providers }) => {
  if (!providers.length) {
    return <p className="text-center text-gray-500">No providers found.</p>;
  }

  return (
    <motion.div
      className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </motion.div>
  );
};

export default ProvidersGrid;
