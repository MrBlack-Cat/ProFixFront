import ProviderCard from './ProviderCard';
import { ServiceProvider } from '../../types/category';

interface Props {
  providers: ServiceProvider[];
}

const ProvidersGrid = ({ providers }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

export default ProvidersGrid;
