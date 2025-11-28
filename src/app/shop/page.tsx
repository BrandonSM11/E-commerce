"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import VehicleCard from "@/components/vehicles/vehiclecard";
import { Button } from "@/components/button/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreateVehicleModal from "@/components/modal/modal";
import { createVehicle, getVehicles } from "@/service/vehicles";
import { Vehicle } from "@/database/models/Vehicles";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { addToCart } from "@/service/cart";

export default function DashboardPage() {

  const { data: session, status } = useSession();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const { t } = useLanguage();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error cargando vehículos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchVehicles();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!session) return null;

  const brands = Array.from(new Set(vehicles.map((v) => v.brand)));

  const filteredVehicles = selectedBrand
    ? vehicles.filter((vehicle) => vehicle.brand === selectedBrand)
    : vehicles;

  const handleCreateVehicle = async (data: Vehicle) => {
    try {
      await createVehicle(data);
      setShowModal(false);
      const updatedVehicles = await getVehicles();
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error("Error creando vehículo:", error);
    }
  };
const handleAddToCart = async (vehicle: Vehicle) => {
  const result = await addToCart(vehicle.idVehicle.toString(), 1);
  if (result.status === 'success') {
    alert(`${vehicle.name} agregado al carrito`);
  } else {
    alert('Error: ' + result.message);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8 text-center space-y-4 px-4">
        <h1 className="text-4xl font-bold">
         {t("shop.title")}, {session?.user?.name || "Usuario"}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("shop.subtitle")}
        </p>
      </section>

      <CreateVehicleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateVehicle}
      />

      <section className="px-4 mb-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedBrand ? "outline" : "default"}
              onClick={() => setSelectedBrand(null)}
            >
              {t("shop.allbrands")}
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

            <Button variant="default" onClick={() => setShowModal(true)}>
              {t("shop.create")}
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">{t("shop.loading")}...</p>
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.idVehicle}
                  vehicle={vehicle}
                  onAddToCart={handleAddToCart}
                />


              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron vehículos para esta marca.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}