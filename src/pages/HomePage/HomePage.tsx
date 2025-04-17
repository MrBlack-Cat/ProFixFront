import Hero from '../../components/Hero/Hero';
import AboutSection from '../../components/About/AboutSection';
import ServicesSection from '../../components/Services/ServicesSection';
import HowItWorksSection from '../../components/HowItWorks/HowItWorksSection';
import Footer from '../../components/Footer/Footer';
import TopRatedPostsSection from '../../components/TopRatedPostsSection/TopRatedPostsSection';
import TopServiceProvidersSection from '../../components/TopServiceProvidersSection/TopServiceProvidersSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TopRatedPostsSection />
      <TopServiceProvidersSection/>
      <HowItWorksSection />
      <Footer />
    </>
  );
};

export default HomePage;
