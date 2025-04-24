import HeroSection from '../../components/Hero/HeroSection.tsx';
import ServicesSection from '../../components/Services/ServicesSection.tsx';
import TopServiceProvidersSection from '../../components/TopServiceProviders/TopServiceProvidersSection.tsx';
import TopRatedPostsSection from '../../components/TopRatedPosts/TopRatedPostsSection.tsx';
import TestimonialsSection from '../../components/Testimonials/TestimonialsSection.tsx';
import HowItWorksSection from '../../components/HowItWorks/HowItWorksSection.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { useEffect } from 'react';

// import AboutSection from '../../components/About/AboutSection.tsx';
// import CallToActionSection from '../components/CallToActionSection'; // новый блок


const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // При загрузке страницы скроллим вверх
  }, []);
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      {/* <AboutSection /> */}
      <ServicesSection />
      <TopServiceProvidersSection />
      <TopRatedPostsSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <Footer />
      {/* 
      <CallToActionSection />
        */}
    </main>
  );
};

export default HomePage;
