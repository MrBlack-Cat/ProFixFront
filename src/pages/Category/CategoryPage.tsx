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
        console.error('Error loading data:', error);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    
    <div className="min-h-screen bg-gray-50">
      {category && <CategoryHeader category={category} />}

      <div className="flex justify-end px-4 md:px-10 mt-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Filter
        </button>
      </div>

      <FilterModal
  isOpen={isFilterOpen}
  onClose={() => setIsFilterOpen(false)}
  providers={providers}
  onApply={(filtered) => {
    setFilteredProviders(filtered);
    setIsFilterOpen(false);
  }}
/>



      <div className="px-4 md:px-10 mt-6 pb-10">
        <ProvidersGrid providers={filteredProviders} />
      </div>
    </div>
  );
};

export default CategoryPage;
