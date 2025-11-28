"use client";

import Link from "next/link";
import { Vehicle } from "@/database/models/Vehicles";
import { Button } from "../button/button";
import { ShoppingCart } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onAddToCart?: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onAddToCart  }: VehicleCardProps) => {
  return (
    <Link href={`/vehicle/${vehicle.idVehicle}`} className="group block">
      <div className="flex flex-col h-full overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
        
        <div className="overflow-hidden h-48 sm:h-56 md:h-60">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {vehicle.brand} • {vehicle.year}
            </p>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {vehicle.model}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-2xl font-bold">
              ${vehicle.price.toLocaleString()}
            </p>

            {onAddToCart && (
              <Button
                size="icon"
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(vehicle);
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
