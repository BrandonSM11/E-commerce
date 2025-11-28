import dbConnection from "../../../lib/db";
import VehicleModel from "../../../database/models/Vehicles";

// Solo necesitas actualizar el método GET en tu route.ts

export async function GET(req: Request) {
  try {
    await dbConnection();

    // Obtener parámetros de query
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const perPage = parseInt(url.searchParams.get("perPage") || "9");
    const search = url.searchParams.get("search") || "";
    const brand = url.searchParams.get("brand") || "";

    // Validar parámetros
    const validPage = Math.max(1, page);
    const validPerPage = Math.max(1, Math.min(100, perPage));

    // Crear filtro
    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (brand) {
      filter.brand = brand;
    }

    // Contar documentos totales con el filtro
    const total = await VehicleModel.countDocuments(filter);

    // Calcular cuántos registros saltar
    const skip = (validPage - 1) * validPerPage;

    // Obtener vehículos paginados y filtrados
    const vehicles = await VehicleModel.find(filter)
      .skip(skip)
      .limit(validPerPage)
      .sort({ createdAt: -1 });

    // Calcular total de páginas
    const totalPages = Math.ceil(total / validPerPage);

    return new Response(JSON.stringify({
      status: "success",
      data: vehicles,
      pagination: {
        page: validPage,
        perPage: validPerPage,
        total,
        totalPages,
      }
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      status: "error",
      message: "Error obteniendo vehículos"
    }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnection();
    const data = await req.json();

    console.log("Data recibida:", data);

    if (!data.brand || !data.model || !data.price || !data.image) {
      return new Response(JSON.stringify({
        status: "error",
        message: "Todos los campos son obligatorios"
      }), { status: 400 });
    }

    // Auto-generar idVehicle
    const lastVehicle = await VehicleModel.findOne().sort({ idVehicle: -1 });
    const nextId = (lastVehicle?.idVehicle || 0) + 1;

    const newVehicle = new VehicleModel({
      ...data,
      idVehicle: nextId
    });
    
    const saved = await newVehicle.save();

    return new Response(JSON.stringify({
      status: "success",
      data: saved
    }), { status: 201 });

  } catch (error) {
    console.error("Error creando vehículo:", error);
    return new Response(JSON.stringify({
      status: "error",
      message: error instanceof Error ? error.message : "Error creando vehículo"
    }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnection();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({
        status: "error",
        message: "ID requerido para actualizar"
      }), { status: 400 });
    }

    const data = await req.json();
    const updated = await VehicleModel.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return new Response(JSON.stringify({
        status: "error",
        message: "Vehículo no encontrado"
      }), { status: 404 });
    }

    return new Response(JSON.stringify({
      status: "success",
      data: updated
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      status: "error",
      message: "Error actualizando vehículo"
    }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnection();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({
        status: "error",
        message: "ID requerido para eliminar"
      }), { status: 400 });
    }

    const deleted = await VehicleModel.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(JSON.stringify({
        status: "error",
        message: "Vehículo no encontrado"
      }), { status: 404 });
    }

    return new Response(JSON.stringify({
      status: "success",
      data: deleted
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      status: "error",
      message: "Error eliminando vehículo"
    }), { status: 500 });
  }
}
