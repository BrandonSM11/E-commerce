'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/button/button';
import VehicleCard from '@/components/vehicles/vehiclecard';
import { getVehicles } from '../../service/vehicles';
import { Vehicle } from '@/database/models/Vehicles';
import { useLanguage } from '@/contexts/LanguageContext';
import { addToCart } from '@/service/cart';

export default function FeaturedVehiclesSection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useLanguage();  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await getVehicles({ perPage: 1000 });
        setVehicles(response.data.slice(0, 3)); 
        setError(null);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('No se pudieron cargar los vehículos');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddToCart = async (vehicle: Vehicle) => {
    const result = await addToCart(vehicle.idVehicle.toString(), 1);
    if (result.status === 'success') {
      alert(`${vehicle.name} agregado al carrito`);
    } else {
      alert('Error: ' + result.message);
    }
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
          {t("home.titleExclusive")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">{t("home.subtitleExclusive")}</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.idVehicle} vehicle={vehicle} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("home.noVehicles")}</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="default" size="lg">
              {t("home.buttonVehicles")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}