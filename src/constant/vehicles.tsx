import { Vehicle } from "@/database/models/Vehicles";


export const vehicles: Vehicle[] = [
  {
    idVehicle: 1,
    name: 'Tesla Model S Plaid',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 135990,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop',
    description: 'The quickest accelerating production car ever made. 1,020 horsepower, tri-motor all-wheel drive.',
    specs: {
      engine: 'Tri Motor Electric',
      horsepower: '1,020 hp',
      transmission: 'Single-Speed',
      topSpeed: '200 mph',
      acceleration: '0-60 in 1.99s'
    }
  },
  {
    idVehicle: 2,
    name: 'Porsche 911 Turbo S',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price: 230400,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop',
    description: 'The pinnacle of 911 performance. Twin-turbocharged flat-six engine with legendary handling.',
    specs: {
      engine: '3.8L Twin-Turbo Flat-6',
      horsepower: '640 hp',
      transmission: '8-Speed PDK',
      topSpeed: '205 mph',
      acceleration: '0-60 in 2.6s'
    }
  },
  {
    idVehicle: 3 ,
    name: 'Mercedes-AMG GT Black Series',
    brand: 'Mercedes-Benz',
    model: 'AMG GT Black Series',
    year: 2024,
    price: 389000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop',
    description: 'The most powerful AMG ever. Track-focused engineering meets luxury craftsmanship.',
    specs: {
      engine: '4.0L Twin-Turbo V8',
      horsepower: '720 hp',
      transmission: '7-Speed DCT',
      topSpeed: '202 mph',
      acceleration: '0-60 in 3.1s'
    }
  },
  {
    idVehicle: 4,
    name: 'Lamborghini Huracán STO',
    brand: 'Lamborghini',
    model: 'Huracán STO',
    year: 2024,
    price: 327838,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop',
    description: 'Super Trofeo Omologata. Race car DNA with road-legal credentials.',
    specs: {
      engine: '5.2L V10',
      horsepower: '640 hp',
      transmission: '7-Speed DCT',
      topSpeed: '193 mph',
      acceleration: '0-60 in 3.0s'
    }
  },
  {
    idVehicle: 5,
    name: 'Ferrari 296 GTB',
    brand: 'Ferrari',
    model: '296 GTB',
    year: 2024,
    price: 321400,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop',
    description: 'Hybrid V6 architecture in a berlinetta. The future of Ferrari performance.',
    specs: {
      engine: '3.0L V6 Hybrid',
      horsepower: '819 hp',
      transmission: '8-Speed DCT',
      topSpeed: '205 mph',
      acceleration: '0-60 in 2.9s'
    }
  },
  {
    idVehicle: 6,
    name: 'Aston Martin DBS Superleggera',
    brand: 'Aston Martin',
    model: 'DBS Superleggera',
    year: 2024,
    price: 316300,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop',
    description: 'British GT excellence. Brutal power wrapped in elegant design.',
    specs: {
      engine: '5.2L Twin-Turbo V12',
      horsepower: '715 hp',
      transmission: '8-Speed Auto',
      topSpeed: '211 mph',
      acceleration: '0-60 in 3.4s'
    }
  },
  {
    idVehicle: 7,
    name: 'McLaren 720S',
    brand: 'McLaren',
    model: '720S',
    year: 2024,
    price: 299000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYD-CSV7vRbZ7MXpznEzHpPPWqpCtDDCHW9-9SdxJuhJ8oUEnpBOup4YpDDqviWF9c5b0&usqp=CAU',
    description: 'Lightweight carbon fiber construction with Formula 1-derived technology.',
    specs: {
      engine: '4.0L Twin-Turbo V8',
      horsepower: '710 hp',
      transmission: '7-Speed DCT',
      topSpeed: '212 mph',
      acceleration: '0-60 in 2.8s'
    }
  },
  {
    idVehicle: 8,
    name: 'Bentley Continental GT Speed',
    brand: 'Bentley',
    model: 'Continental GT Speed',
    year: 2024,
    price: 274900,
    image: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=800&auto=format&fit=crop',
    description: 'Grand touring perfection. Where luxury meets breathtaking performance.',
    specs: {
      engine: '6.0L Twin-Turbo W12',
      horsepower: '650 hp',
      transmission: '8-Speed DCT',
      topSpeed: '208 mph',
      acceleration: '0-60 in 3.5s'
    }
  }
];