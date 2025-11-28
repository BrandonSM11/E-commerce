// app/dashboard/[slug]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Vehicle } from "@/database/models/Vehicles";
import { getVehicles } from "@/service/vehicles";
import Link from "next/link";

const Details = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error cargando vehículos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const vehicle = vehicles.find((v) => v.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Vehículo no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 flex justify-center bg-black">
      <div className="max-w-4xl w-full glass-card rounded-xl p-8 text-white">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h1 className="text-4xl font-display font-bold text-primary mb-4">
          {vehicle.name}
        </h1>
        
        <div className="flex gap-4 mb-4 text-lg">
          <span className="text-gray-400">Marca: <span className="text-white">{vehicle.brand}</span></span>
          <span className="text-gray-400">Modelo: <span className="text-white">{vehicle.model}</span></span>
          <span className="text-gray-400">Año: <span className="text-white">{vehicle.year}</span></span>
        </div>

        <p className="text-2xl font-bold text-primary mb-6">
          ${vehicle.price.toLocaleString()}
        </p>

        <p className="text-foreground/70 text-lg leading-relaxed mb-6">
          {vehicle.description}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Especificaciones</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Motor</p>
              <p className="text-white">{vehicle.specs.engine}</p>
            </div>
            <div>
              <p className="text-gray-400">Potencia</p>
              <p className="text-white">{vehicle.specs.horsepower}</p>
            </div>
            <div>
              <p className="text-gray-400">Transmisión</p>
              <p className="text-white">{vehicle.specs.transmission}</p>
            </div>
            <div>
              <p className="text-gray-400">Velocidad Máxima</p>
              <p className="text-white">{vehicle.specs.topSpeed}</p>
            </div>
            <div>
              <p className="text-gray-400">Aceleración 0-100</p>
              <p className="text-white">{vehicle.specs.acceleration}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
};

export default Details;