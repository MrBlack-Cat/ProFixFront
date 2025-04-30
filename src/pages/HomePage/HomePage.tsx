import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from '../../components/Hero/HeroSection.tsx';
import ServicesSection from '../../components/Services/ServicesSection.tsx';
import TopServiceProvidersSection from '../../components/TopServiceProviders/TopServiceProvidersSection.tsx';
import TopRatedPostsSection from '../../components/TopRatedPosts/TopRatedPostsSection.tsx';
import TestimonialsSection from '../../components/Testimonials/TestimonialsSection.tsx';
import HowItWorksSection from '../../components/HowItWorks/HowItWorksSection.tsx';
import Footer from '../../components/Footer/Footer.tsx';
// import AboutSection from '../../components/About/AboutSection.tsx';
// import CallToActionSection from '../components/CallToActionSection';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); 
    }
  }, [location]);

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
      {/* <CallToActionSection /> */}
    </main>
  );
};

export default HomePage;
