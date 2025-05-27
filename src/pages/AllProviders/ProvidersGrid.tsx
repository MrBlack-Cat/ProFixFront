import React from 'react';
import { ServiceProvider } from '../../types/category';
import ProviderCard from './ProviderCard';

const ProvidersGrid: React.FC<{ providers: ServiceProvider[] }> = ({ providers }) => {
  if (!providers.length) {
    return <p className="text-center text-gray-500">No providers found.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

export default ProvidersGrid;
