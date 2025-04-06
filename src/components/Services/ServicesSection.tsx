import { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import ServiceCard from './ServiceCard';

interface ServiceType {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  serviceTypes: ServiceType[];
}

const ServicesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('https://localhost:7164/api/ParentCategory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const parentData = await res.json();

      if (parentData?.data) {
        const enrichedCategories = await Promise.all(
          parentData.data.map(async (parent: any) => {
            const typeRes = await fetch(`https://localhost:7164/api/ServiceType/by-category/${parent.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const types = await typeRes.json();
            return {
              id: parent.id,
              name: parent.name,
              icon: '🛠️', 
              serviceTypes: types?.data || []
            };
          })
        );
        setCategories(enrichedCategories);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionTitle
          title="Browse All Categories"
          subtitle="Click to explore freelancers in each service category"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mt-12">
          {categories.map((cat) => (
            <ServiceCard
              key={cat.id}
              id={cat.id}
              icon={cat.icon}
              category={cat.name}
              serviceTypes={cat.serviceTypes.map((st: ServiceType) => st.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
