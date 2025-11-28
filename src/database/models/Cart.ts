import { Schema, model, models, Model } from "mongoose";

export interface CartItem {
    vehicleId: number;
    quantity: number;
    price: number;
    name?: string;
    image?: string;
}

export interface Cart {
    userId: string;
    items: CartItem[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

const CartSchema = new Schema<Cart>(
    {
        userId: {
            type: String,
            required: [true, "El ID del usuario es obligatorio"],
            unique: true,
        },
        items: [
            {
                vehicleId: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                image: {
                    type: String,
                    required: false,
                },
            },
        ],
        total: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false, timestamps: true }
);

// Middleware: calcula el total antes de guardar
CartSchema.pre("save", function (next) {
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    next();
});

const CartModel: Model<Cart> =
    models.Cart || model<Cart>("Cart", CartSchema);

export default CartModel;