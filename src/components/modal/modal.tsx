"use client";

import { useState } from "react";
import { Button } from "../button/button";
import { Vehicle } from "@/database/models/Vehicles";
import { createVehicle, uploadImage } from "@/service/vehicles";

interface CreateVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Vehicle) => Promise<void>;
}

export default function CreateVehicleModal({
  open,
  onClose,
  onSubmit,
}: CreateVehicleModalProps) {
  const [form, setForm] = useState({
    idVehicle: "",
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    image: null as File | null,
    description: "",
    engine: "",
    horsepower: "",
    transmission: "",
    topSpeed: "",
    acceleration: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm({ ...form, image: file });

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (form.image) {
        imageUrl = await uploadImage(form.image);
      }

      const finalForm = {
        name: form.name,
        brand: form.brand,
        model: form.model,
        image: imageUrl,
        year: Number(form.year),
        price: Number(form.price),
        description: form.description,
        specs: {
          engine: form.engine,
          horsepower: form.horsepower,
          transmission: form.transmission,
          topSpeed: form.topSpeed,
          acceleration: form.acceleration,
        },
      };

      onSubmit(finalForm as Vehicle);
      setForm({
        idVehicle: "",
        name: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        image: null,
        description: "",
        engine: "",
        horsepower: "",
        transmission: "",
        topSpeed: "",
        acceleration: "",
      });
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Crear Vehículo</h2>

        <form onSubmit={submitForm} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="name"
              placeholder="Nombre"
              className="input"
              onChange={handleChange}
            />
            <input
              name="brand"
              placeholder="Marca"
              className="input"
              onChange={handleChange}
            />
            <input
              name="model"
              placeholder="Modelo"
              className="input"
              onChange={handleChange}
            />
            <input
              name="year"
              placeholder="Año"
              type="number"
              className="input"
              onChange={handleChange}
            />
            <input
              name="price"
              placeholder="Precio"
              type="number"
              className="input"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="input file:bg-gray-200 file:text-gray-700 file:cursor-pointer file:rounded-md file:mr-4"
              onChange={handleFileChange}
            />

            {imagePreview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          <textarea
            name="description"
            placeholder="Descripción"
            className="input h-20"
            onChange={handleChange}
          />

          <h3 className="font-semibold">Especificaciones</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              name="engine"
              placeholder="Motor"
              className="input"
              onChange={handleChange}
            />
            <input
              name="horsepower"
              placeholder="Caballos de fuerza"
              className="input"
              onChange={handleChange}
            />
            <input
              name="transmission"
              placeholder="Transmisión"
              className="input"
              onChange={handleChange}
            />
            <input
              name="topSpeed"
              placeholder="Velocidad máxima"
              className="input"
              onChange={handleChange}
            />
            <input
              name="acceleration"
              placeholder="0-100 km/h"
              className="input"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancelar
            </Button>

            <Button type="submit" variant="default">
              Crear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// const [price, setPrice] = useState<string | null>(null);
// <input
//   name="price"
//   placeholder="Precio"
//   type="number"
//   className="input"
//   value = {price}
//   onChange={() =>{
// const value = Number(e.target.value)
// setPrice(value)}}
// />
