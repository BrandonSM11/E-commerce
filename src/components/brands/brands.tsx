'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Vehicle } from '@/database/models/Vehicles';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BrandsSection() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {t} = useLanguage()

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<{ status: string; data: Vehicle[] }>('/api/vehicles');
        
        // Extraer marcas únicas
        const uniqueBrands = Array.from(
          new Set(data.data.map((vehicle) => vehicle.brand))
        ).sort();
        
        setBrands(uniqueBrands);
        setError(null);
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('No se pudieron cargar las marcas');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Función para obtener el logo (placeholder por ahora)
  const getBrandLogo = (brand: string) => {
    const logos: Record<string, string> = {
      'Tesla': '/logos/tesla.png',
      'Porsche': '/logos/porche.png',
      'Mercedes-Benz': '/logos/mercedes.png',
      'Ferrari': '/logos/ferrari.png',
      'Lamborghini': '/logos/lamborghini.png',
      'McLaren': '/logos/mclaren.png',
      'Aston Martin': '/logos/aston-martin.png',
      'Bentley': '/logos/bentley.png',
    };
    return logos[brand] || null;
  };

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
            {t("home.brandsPremium")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">{t("home.subtitleBrands")}</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className=""></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : brands.length > 0 ? (
          <div className="grid grid-cols-8 ">
            {brands.map((brand) => {
              const logo = getBrandLogo(brand);
              return (
                <Link
                  key={brand}
                  href={`/shop?brand=${brand}`}
                  className="aspect-square bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary hover:shadow-md transition-all duration-300 group h-40 w-40"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={brand}
                      className="w-50 h-50 object-contain group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <span className="text-sm font-semibold group-hover:scale-110 transition-transform text-center px-3">
                      {brand}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay marcas disponibles</p>
          </div>
        )}
      </div>
    </section>
  );
}