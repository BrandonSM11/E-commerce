import axios from "axios";
import { Vehicle } from "@/database/models/Vehicles";

const API_URL = "/api/vehicles";

interface PaginationParams {
  page?: number;
  perPage?: number;
  search?: string;
  brand?: string;
}

interface GetVehiclesResponse {
  status: string;
  data: Vehicle[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export const getVehicles = async (
  params?: PaginationParams
): Promise<GetVehiclesResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.perPage) queryParams.append("perPage", params.perPage.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.brand) queryParams.append("brand", params.brand);

    const { data } = await axios.get(
      `${API_URL}?${queryParams.toString()}`
    );
    return data;
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