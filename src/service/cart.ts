
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

export async function addToCart(vehicleId: string, quantity: number = 1) {
  try {
    const response = await api.post('/api/cart', { vehicleId, quantity });
    return response.data;
  } catch (error: any) {
    console.error('Error en addToCart:', error.response?.data || error.message);
    return { status: 'error', message: 'Error agregando al carrito' };
  }
}

export async function getCart() {
  try {
    const response = await api.get('/api/cart');
    return response.data;
  } catch (error) {
    return { status: 'error', message: 'Error obteniendo carrito' };
  }
}

export async function removeFromCart(vehicleId: string) {
  try {
    const response = await api.delete('/api/cart', {
      params: { vehicleId },
    });
    return response.data;
  } catch (error) {
    return { status: 'error', message: 'Error eliminando del carrito' };
  }
}

export async function updateQuantity(vehicleId: string, quantity: number) {
  try {
    const response = await api.put('/api/cart', { vehicleId, quantity });
    return response.data;
  } catch (error) {
    return { status: 'error', message: 'Error actualizando cantidad' };
  }
}