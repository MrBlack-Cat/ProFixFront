import { useEffect, useState } from 'react';
import ProvidersGrid from '../AllProviders/ProvidersGrid';
import FilterModal from '../../pages/AllProviders/FilterModal';
import { ServiceProvider } from '../../types/category';

const AllProvidersPage = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const token = localStorage.getItem('accessToken');

  const fetchRating = async (providerId: number): Promise<number> => {
    try {
      const res = await fetch(`https://localhost:7164/api/Review/average-rating/${providerId}`);
      const json = await res.json();
      return json?.data ?? 0;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://localhost:7164/api/ServiceProviderProfile/ListOfProfiles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        const baseProviders: ServiceProvider[] = json?.data || [];

        const enriched = await Promise.all(
          baseProviders.map(async (p) => ({
            ...p,
            rating: await fetchRating(p.id),
          }))
        );

        setProviders(enriched);
        setFilteredProviders(enriched);
      } catch (error) {
        console.error('❌ Failed to load providers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#b6fcf3] via-[#adbbf5] to-[#ccdaf7] px-4 md:px-10 py-8">
      <div className="max-w-8xl mx-auto bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-6">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
          <h2 className="text-3xl mt-5 md:text-4xl font-bold text-emerald-800">All Service Providers</h2>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
          >
            🔍 Filter
          </button>
        </div>

        {/* Modal */}
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          providers={providers}
          onApply={(filtered) => {
            setFilteredProviders(filtered);
            setIsFilterOpen(false);
          }}
        />

        {/* Grid */}
        <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          <ProvidersGrid providers={filteredProviders} />
        </div>
      </div>
    </div>
  );
};

export default AllProvidersPage;
