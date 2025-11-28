"use client";

import { useState } from "react";
import * as yup from "yup";
import { Button } from "../button/button";
import { Vehicle } from "@/database/models/Vehicles";
import { createVehicle, uploadImage } from "@/service/vehicles";

interface CreateVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Vehicle) => Promise<void>;
}

// Schema de validación con Yup
const vehicleSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido").min(3, "Mínimo 3 caracteres"),
  brand: yup.string().required("La marca es requerida"),
  model: yup.string().required("El modelo es requerido"),
  year: yup.number().required("El año es requerido").min(1900, "Año inválido").max(new Date().getFullYear() + 1, "Año no puede ser futuro"),
  price: yup.number().required("El precio es requerido").positive("El precio debe ser positivo"),
  image: yup.mixed().required("La imagen es requerida"),
  description: yup.string().required("La descripción es requerida").min(10, "Mínimo 10 caracteres"),
  engine: yup.string().required("El motor es requerido"),
  horsepower: yup.string().required("Los caballos de fuerza son requeridos"),
  transmission: yup.string().required("La transmisión es requerida"),
  topSpeed: yup.string().required("La velocidad máxima es requerida"),
  acceleration: yup.string().required("La aceleración es requerida"),
});

export default function CreateVehicleModal({
  open,
  onClose,
  onSubmit,
}: CreateVehicleModalProps) {
  const [form, setForm] = useState({
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
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

    if (errors.image) {
      setErrors({ ...errors, image: "" });
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validar con Yup
      await vehicleSchema.validate(form, { abortEarly: false });
      setErrors({});

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
      if (error instanceof Error) {
        console.error("Errores de validación:", error.message);
        alert(error.message);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Crear Vehículo</h2>

        <form onSubmit={submitForm} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                name="name"
                placeholder="Nombre"
                className="input"
                onChange={handleChange}
                value={form.name}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                name="brand"
                placeholder="Marca"
                className="input"
                onChange={handleChange}
                value={form.brand}
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            <div>
              <input
                name="model"
                placeholder="Modelo"
                className="input"
                onChange={handleChange}
                value={form.model}
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
            </div>

            <div>
              <input
                name="year"
                placeholder="Año"
                type="number"
                className="input"
                onChange={handleChange}
                value={form.year}
              />
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
            </div>

            <div>
              <input
                name="price"
                placeholder="Precio"
                type="number"
                className="input"
                onChange={handleChange}
                value={form.price}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="input file:bg-gray-200 file:text-gray-700 file:cursor-pointer file:rounded-md file:mr-4"
              onChange={handleFileChange}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

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

          <div>
            <textarea
              name="description"
              placeholder="Descripción"
              className="input h-20"
              onChange={handleChange}
              value={form.description}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <h3 className="font-semibold">Especificaciones</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                name="engine"
                placeholder="Motor"
                className="input"
                onChange={handleChange}
                value={form.engine}
              />
              {errors.engine && <p className="text-red-500 text-sm mt-1">{errors.engine}</p>}
            </div>

            <div>
              <input
                name="horsepower"
                placeholder="Caballos de fuerza"
                className="input"
                onChange={handleChange}
                value={form.horsepower}
              />
              {errors.horsepower && <p className="text-red-500 text-sm mt-1">{errors.horsepower}</p>}
            </div>

            <div>
              <input
                name="transmission"
                placeholder="Transmisión"
                className="input"
                onChange={handleChange}
                value={form.transmission}
              />
              {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
            </div>

            <div>
              <input
                name="topSpeed"
                placeholder="Velocidad máxima"
                className="input"
                onChange={handleChange}
                value={form.topSpeed}
              />
              {errors.topSpeed && <p className="text-red-500 text-sm mt-1">{errors.topSpeed}</p>}
            </div>

            <div className="col-span-2">
              <input
                name="acceleration"
                placeholder="0-100 km/h"
                className="input"
                onChange={handleChange}
                value={form.acceleration}
              />
              {errors.acceleration && <p className="text-red-500 text-sm mt-1">{errors.acceleration}</p>}
            </div>
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