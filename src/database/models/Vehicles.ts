import { Schema, model, models, Model } from "mongoose";

export interface Vehicle {
  idVehicle: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  specs: {
    engine: string;
    horsepower: string;
    transmission: string;
    topSpeed: string;
    acceleration: string;
  };
}

const VehicleSchema = new Schema<Vehicle>(
  {
    idVehicle: {
      type: Number,
      required: [true, "El ID del vehículo es obligatorio"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "El nombre del vehículo es obligatorio"],
    },
    brand: {
      type: String,
      required: [true, "La marca del vehículo es obligatoria"],
    },
    model: {
      type: String,
      required: [true, "El modelo del vehículo es obligatorio"],
    },
    year: {
      type: Number,
      required: [true, "El año del vehículo es obligatorio"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    image: {
      type: String,
      required: [true, "La imagen del vehículo es obligatoria"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    specs: {
      engine: { type: String, required: true },
      horsepower: { type: String, required: true },
      transmission: { type: String, required: true },
      topSpeed: { type: String, required: true },
      acceleration: { type: String, required: true },
    },
  },
  { versionKey: false, timestamps: true }
);

const VehicleModel: Model<Vehicle> =
  models.Vehicle || model<Vehicle>("Vehicle", VehicleSchema);

export default VehicleModel;
