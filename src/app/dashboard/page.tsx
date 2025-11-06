"use client";

<<<<<<< HEAD:src/app/dashboard/page.tsx
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> my-saved-work:src/app/shop/page.tsx
import { vehicles } from "@/constant/vehicles";
import Navbar from "@/components/navbar";
import VehicleCard from "@/components/vehiclecard";
import { Button } from "@/components/button/button";
<<<<<<< HEAD:src/app/dashboard/page.tsx
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
=======
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
>>>>>>> my-saved-work:src/app/shop/page.tsx

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Si no hay sesión, redirigir al login
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) return null; // evita parpadeo mientras redirige

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "loading") return <p className="text-center mt-20">Cargando...</p>;

  const brands = Array.from(new Set(vehicles.map((v) => v.brand)));

  const filteredVehicles = selectedBrand
    ? vehicles.filter((vehicle) => vehicle.brand === selectedBrand)
    : vehicles;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

<<<<<<< HEAD:src/app/dashboard/page.tsx
      <section className="pt-28 pb-8 text-center space-y-4 px-4">
        <h1 className="text-4xl font-bold">
          Welcome, {session?.user?.name || "User"} 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore our luxury car collection below.
=======
      {/* ✅ Header con usuario y Sign Out */}
      <div className="flex justify-between items-center px-8 py-4">
        <h2 className="text-2xl font-semibold">
          Welcome, {session.user?.name || session.user?.email}
        </h2>
        <Button
          variant="outline"
          onClick={async () => {
            await signOut({ redirect: false });
            router.push("/login");
          }}
        >
          Sign Out
        </Button>
      </div>

      <section className="pt-12 pb-8 text-center space-y-4 px-4">
        <h1 className="text-5xl font-bold">Our Luxury Collection</h1>
        <p className="text-muted-foreground text-lg">
          Choose your dream car from the world’s finest manufacturers.
>>>>>>> my-saved-work:src/app/shop/page.tsx
        </p>
        <Button
          variant="outline"
          onClick={async () => {
            await signOut({ redirect: false });
            router.push("/login");
          }}
        >
          Sign Out
        </Button>
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
}
