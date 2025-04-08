import Hero from '../../components/Hero/Hero';
import AboutSection from '../../components/About/AboutSection';
import ServicesSection from '../../components/Services/ServicesSection';
import HowItWorksSection from '../../components/HowItWorks/HowItWorksSection';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <Footer />
    </>
  );
};

export default HomePage;
