import { auth } from "@/app/api/auth/[...nextauth]/route";
import dbConnection from "../../../lib/db";
import CartModel from "../../../database/models/Cart";
import VehicleModel from "../../../database/models/Vehicles";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new Response(
                JSON.stringify({ status: "error", message: "No autenticado" }),
                { status: 401 }
            );
        }

        await dbConnection();

        const cart = await CartModel.findOne({ userId: session.user.email });

        if (!cart) {
            return new Response(
                JSON.stringify({
                    status: "success",
                    data: { userId: session.user.email, items: [], total: 0 }
                }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ status: "success", data: cart }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: "error",
                message: error instanceof Error ? error.message : "Error obteniendo carrito"
            }),
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new Response(
                JSON.stringify({ status: "error", message: "No autenticado" }),
                { status: 401 }
            );
        }

        await dbConnection();
        const { vehicleId, quantity = 1 } = await req.json();

        if (!vehicleId) {
            return new Response(
                JSON.stringify({ status: "error", message: "vehicleId requerido" }),
                { status: 400 }
            );
        }

        // Obtener el vehículo para validar y obtener precio
        const vehicle = await VehicleModel.findOne({ idVehicle: parseInt(vehicleId) });
        if (!vehicle) {
            return new Response(
                JSON.stringify({ status: "error", message: "Vehículo no encontrado" }),
                { status: 404 }
            );
        }

        // Buscar o crear carrito
        let cart = await CartModel.findOne({ userId: session.user.email });

        if (!cart) {
            cart = new CartModel({
                userId: session.user.email,
                items: [],
            });
        }

        // Verificar si el vehículo ya está en el carrito
        const existingItem = cart.items.find(
            (item) => item.vehicleId === parseInt(vehicleId)
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                vehicleId: parseInt(vehicleId),
                quantity,
                price: vehicle.price,
                name: vehicle.name,
                image: vehicle.image,
            });

        }

        await cart.save();

        return new Response(
            JSON.stringify({ status: "success", data: cart }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error en POST /api/cart:", error);
        return new Response(
            JSON.stringify({
                status: "error",
                message: error instanceof Error ? error.message : "Error agregando al carrito"
            }),
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new Response(
                JSON.stringify({ status: "error", message: "No autenticado" }),
                { status: 401 }
            );
        }

        await dbConnection();
        const { vehicleId, quantity } = await req.json();

        if (!vehicleId || quantity === undefined) {
            return new Response(
                JSON.stringify({ status: "error", message: "vehicleId y quantity requeridos" }),
                { status: 400 }
            );
        }

        const cart = await CartModel.findOne({ userId: session.user.email });

        if (!cart) {
            return new Response(
                JSON.stringify({ status: "error", message: "Carrito no encontrado" }),
                { status: 404 }
            );
        }

        const item = cart.items.find(
            (item) => item.vehicleId === parseInt(vehicleId)
        );

        if (!item) {
            return new Response(
                JSON.stringify({ status: "error", message: "Producto no en carrito" }),
                { status: 404 }
            );
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter(
                (item) => item.vehicleId !== parseInt(vehicleId)
            );
        } else {
            item.quantity = quantity;
        }

        await cart.save();

        return new Response(
            JSON.stringify({ status: "success", data: cart }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: "error",
                message: error instanceof Error ? error.message : "Error actualizando carrito"
            }),
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new Response(
                JSON.stringify({ status: "error", message: "No autenticado" }),
                { status: 401 }
            );
        }

        await dbConnection();
        const url = new URL(req.url);
        const vehicleId = url.searchParams.get("vehicleId");

        if (!vehicleId) {
            return new Response(
                JSON.stringify({ status: "error", message: "vehicleId requerido" }),
                { status: 400 }
            );
        }

        const cart = await CartModel.findOne({ userId: session.user.email });

        if (!cart) {
            return new Response(
                JSON.stringify({ status: "error", message: "Carrito no encontrado" }),
                { status: 404 }
            );
        }

        cart.items = cart.items.filter(
            (item) => item.vehicleId !== parseInt(vehicleId)
        );

        await cart.save();

        return new Response(
            JSON.stringify({ status: "success", data: cart }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: "error",
                message: error instanceof Error ? error.message : "Error eliminando del carrito"
            }),
            { status: 500 }
        );
    }
}