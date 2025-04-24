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
    <div className="min-h-screen bg-gradient-to-tr from-[#e1f5f2] via-[#f5f7fa] to-[#d0d7e8] px-4 md:px-10 py-10">
      {/* Заголовок категории */}
      {category && <CategoryHeader category={category} />}

      {/* Кнопка фильтра */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          🔍 Filter
        </button>
      </div>

      {/* Модалка фильтра */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        providers={providers}
        onApply={(filtered) => {
          setFilteredProviders(filtered);
          setIsFilterOpen(false);
        }}
      />

      {/* Сетка провайдеров */}
      <div className="mt-10">
        <ProvidersGrid providers={filteredProviders} />
      </div>
    </div>
  );
};

export default CategoryPage;
