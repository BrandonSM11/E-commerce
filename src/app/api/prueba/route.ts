import { NextResponse } from "next/server";
import * as yup from "yup";

const userSchema = yup.object().shape({
    nameVehicle: yup.string().required(),
    brand: yup.string().required(),
    price: yup.number().required(),
    year: yup.string().required().max(4)
});

export async function POST (request:Request){
    try {
        const body = await request.json()
        const validateData = await userSchema.validate(body);

        return NextResponse.json(
            { message: "Vehiculo creado", data: validateData},
            {status: 200}
        );
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message})
    }
}