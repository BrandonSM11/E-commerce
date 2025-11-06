import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/button/button';
import { vehicles } from '@/constant/vehicles';
import Navbar from '@/components/navbar';
import VehicleCard from '@/components/vehiclecard';

const Home = () => {
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&auto=format&fit=crop"
            alt="Luxury Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Drive Your
            <br />
            <span className="text-muted-foreground">Dreams</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the pinnacle of automotive excellence. Curated collection of the worlds most prestigious vehicles.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
              Handpicked Selection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Featured Vehicles</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.idVehicle} vehicle={vehicle} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/dashboard">
              <Button variant="default" size="lg">
                View All Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Categories */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
              Premium Brands
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Explore by Manufacturer</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Tesla', 'Porsche', 'Mercedes-Benz', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 'Bentley'].map((brand) => (
              <Link
                key={brand}
                
                href={`/dashboard?brand=${brand}`}
                className="aspect-square bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-lg font-semibold group-hover:scale-110 transition-transform">
                  {brand}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
