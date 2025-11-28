 "use client" 
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/button/button';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';
import FeaturedVehiclesSection from '@/components/featuredVehicles/featuredVehicles';
import BrandsSection from '@/components/brands/brands';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />


     <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dzifkqomf/image/upload/v1764333191/home_wpipca.avif"
            alt="Auto de lujo"
            fill
            className="object-cover"
            priority
            />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            {t("home.title")}
            <br />
            <span className="text-muted-foreground">{t("home.subtitle")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
           {t("home.slogan")}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg">
                {t("home.buttonColeccion")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedVehiclesSection />

      <BrandsSection />
    </div>
  );
};

export default Home;
