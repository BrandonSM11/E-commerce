import axios from "axios";
import { Vehicle } from "@/database/models/Vehicles"; 

const API_URL = "/api/vehicles";


export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const { data } = await axios.get(API_URL);
    return data.data;
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    throw new Error("No se pudieron obtener los vehículos");
  }
};


// Actualizar un vehículo por ID
export const updateVehicle = async (id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
  try {
    const { data } = await axios.put(`${API_URL}?id=${id}`, vehicle);
    return data;
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    throw new Error("No se pudo actualizar el vehículo");
  }
};

// Eliminar un vehículo por ID
export const deleteVehicle = async (id: string): Promise<Vehicle> => {
  try {
    const { data } = await axios.delete(`${API_URL}?id=${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    throw new Error("No se pudo eliminar el vehículo");
  }
};

// Crear un nuevo vehículo
export const createVehicle = async (vehicle: Partial<Vehicle>): Promise<Vehicle> => {
  try {
    const { data } = await axios.post(API_URL, vehicle);
    return data;
  } catch (error) {
    console.error("Error al crear vehículo:", error);
    throw new Error("No se pudo crear el vehículo");
  }
};
// Service llamar el back de uploadd
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const data = new FormData();
    data.append("file", file);
    
    const { data: response } = await axios.post("/api/upload", data);
    return response.result.secure_url;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw new Error("No se pudo subir la imagen");  
  }
};