"use client";

import { useState } from "react";
import { vehicles } from '@/constant/vehicles';
import Navbar from "@/components/navbar";
import VehicleCard from "@/components/vehiclecard";
import { Button } from "@/components/button";

const Shop = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = Array.from(new Set(vehicles.map((v) => v.brand)));

  const filteredVehicles = selectedBrand
    ? vehicles.filter((vehicle) => vehicle.brand === selectedBrand)
    : vehicles;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 text-center space-y-4 px-4">
        <h1 className="text-5xl font-bold">Our Luxury Collection</h1>
        <p className="text-muted-foreground text-lg">
          Choose your dream car from the worlds finest manufacturers.
        </p>
      </section>

      <section className="px-4 mb-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedBrand ? "outline" : "default"}
              onClick={() => setSelectedBrand(null)}
            >
              All Brands
            </Button>

            {brands.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container mx-auto">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.idVehicle} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No vehicles found for this brand.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
