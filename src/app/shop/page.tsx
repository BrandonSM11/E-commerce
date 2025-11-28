"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import VehicleCard from "@/components/vehicles/vehiclecard";
import { Button } from "@/components/button/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreateVehicleModal from "@/components/modal/modal";
import { createVehicle, getVehicles } from "@/service/vehicles";
import { Vehicle } from "@/database/models/Vehicles";
import { useLanguage } from "@/contexts/LanguageContext";
import { addToCart } from "@/service/cart";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    perPage: 1,
  });
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Cargar vehículos cuando cambia página, búsqueda o marca
  useEffect(() => {
    if (status === "authenticated") {
      fetchVehicles();
    }
  }, [status, currentPage, selectedBrand, searchTerm]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await getVehicles({
        page: currentPage,
        perPage: 1,
        search: searchTerm,
        brand: selectedBrand || undefined,
      });

      setVehicles(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar todas las marcas
  const fetchAllBrands = async () => {
    try {
      const response = await getVehicles({ perPage: 1000 });
      const brands = Array.from(new Set(response.data.map((v) => v.brand)));
      setAllBrands(brands as string[]);
    } catch (error) {
      console.error("Error cargando marcas:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllBrands();
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

  const handleCreateVehicle = async (data: Vehicle) => {
    try {
      await createVehicle(data);
      setShowModal(false);
      setCurrentPage(1);
      fetchVehicles();
      fetchAllBrands();
    } catch (error) {
      console.error("Error creando vehículo:", error);
    }
  };

  const handleAddToCart = async (vehicle: Vehicle) => {
    const result = await addToCart(vehicle.idVehicle.toString(), 1);
    if (result.status === "success") {
      alert(`${vehicle.name} agregado al carrito`);
    } else {
      alert("Error: " + result.message);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleBrandFilter = (brand: string | null) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
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

      {/* Buscador */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <input
            type="text"
            placeholder="Buscar vehículos..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Filtros por marca */}
      <section className="px-4 mb-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedBrand ? "outline" : "default"}
              onClick={() => handleBrandFilter(null)}
            >
              {t("shop.allbrands")}
            </Button>

            {allBrands.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                onClick={() => handleBrandFilter(brand)}
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

      {/* Grid de vehículos */}
      <section className="px-4 pb-24">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t("shop.loading")}...
              </p>
            </div>
          ) : vehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.idVehicle}
                    vehicle={vehicle}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Paginación */}
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  type="button"
                >
                  Anterior
                </Button>

                <span className="text-sm text-muted-foreground">
                  Página {pagination.page} de {pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  onClick={() => currentPage < pagination.totalPages && setCurrentPage(currentPage + 1)}
                  type="button"
                >
                  Siguiente
                </Button>
              </div>

              <div className="text-center mt-4 text-sm text-muted-foreground">
                Mostrando {vehicles.length} de {pagination.total} vehículos
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron vehículos.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}