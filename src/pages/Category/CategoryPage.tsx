import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryHeader from '../../components/Category/CategoryHeader';
import ProvidersGrid from '../../components/Category/ProvidersGrid';
import FilterModal from '../../components/Category/FilterModal';
import { Category, ServiceProvider } from '../../types/category';

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await fetch(`https://localhost:7164/api/ParentCategory/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const categoryData = await categoryRes.json();
        setCategory(categoryData?.data);

        const providerRes = await fetch(`https://localhost:7164/api/ServiceProviderProfile/by-category/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!providerRes.ok) throw new Error('Service Providers not found');

        const providerData = await providerRes.json();
        setProviders(providerData?.data || []);
        setFilteredProviders(providerData?.data || []);
      } catch (error) {
        console.error('❌ Error loading data:', error);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1f4f4a] via-[#93a7b2] to-[#7396b5] px-4 md:px-10 py-4">
      <div className="max-w-8xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8">
        {/* title */}
        {category && <CategoryHeader category={category} />}

        {/* Filtr */}
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
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
        <div className="mt-2 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          <ProvidersGrid providers={filteredProviders} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
