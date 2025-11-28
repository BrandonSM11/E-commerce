 "use client" 
import Navbar from '@/components/navbar/navbar';
import BrandsSection from '@/components/brands/brands';
import FeaturedVehiclesSection from '@/components/featuredVehicles/featuredVehicles';
import HeroCarousel from '../components/heroCarrusel/carrusel';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />


    <HeroCarousel /> 

      <FeaturedVehiclesSection />

      <BrandsSection />
    </div>
  );
};

export default Home;
