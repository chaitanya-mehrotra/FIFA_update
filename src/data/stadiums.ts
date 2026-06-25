export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  capacity: number;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  image: string;
  keywords: string[];
}

export const stadiums: Stadium[] = [
  // USA
  {
    id: 'metlife',
    name: 'MetLife Stadium',
    city: 'New York/New Jersey',
    country: 'USA',
    capacity: 82500,
    coordinates: [40.8136, -74.0745],
    description: 'An open-air multi-purpose stadium at the Meadowlands Sports Complex. It will host the Final of the FIFA World Cup 2026.',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1000&auto=format&fit=crop',
    keywords: ['New York', 'New Jersey', 'MetLife']
  },
  {
    id: 'sofi',
    name: 'SoFi Stadium',
    city: 'Los Angeles',
    country: 'USA',
    capacity: 70240,
    coordinates: [33.9535, -118.3390],
    description: 'A state-of-the-art sports and entertainment complex in Inglewood. Known for its incredible infinity screen.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Los Angeles', 'SoFi']
  },
  {
    id: 'att',
    name: 'AT&T Stadium',
    city: 'Dallas',
    country: 'USA',
    capacity: 80000,
    coordinates: [32.7473, -97.0945],
    description: 'A retractable-roof stadium in Arlington, Texas. Known for its massive high-definition video screen.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Dallas', 'AT&T']
  },
  {
    id: 'nrg',
    name: 'NRG Stadium',
    city: 'Houston',
    country: 'USA',
    capacity: 72220,
    coordinates: [29.6847, -95.4107],
    description: 'The first NFL facility to have a retractable roof. It has hosted numerous major sporting events.',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d44570a2c9?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Houston', 'NRG']
  },
  {
    id: 'mercedes-benz',
    name: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'USA',
    capacity: 71000,
    coordinates: [33.7554, -84.4006],
    description: 'Features a unique retractable roof composed of eight triangular, translucent panels.',
    image: 'https://images.unsplash.com/photo-1563810237731-5079a405ea7e?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Atlanta', 'Mercedes-Benz']
  },
  {
    id: 'lincoln-financial',
    name: 'Lincoln Financial Field',
    city: 'Philadelphia',
    country: 'USA',
    capacity: 69796,
    coordinates: [39.9008, -75.1675],
    description: 'Located in South Philadelphia, it is a premier venue known for its passionate fans and modern amenities.',
    image: 'https://images.unsplash.com/photo-1589139366522-a602cff8a436?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Philadelphia', 'Lincoln']
  },
  {
    id: 'hard-rock',
    name: 'Hard Rock Stadium',
    city: 'Miami',
    country: 'USA',
    capacity: 64767,
    coordinates: [25.9580, -80.2389],
    description: 'A multi-purpose stadium located in Miami Gardens, recently renovated with a state-of-the-art canopy.',
    image: 'https://images.unsplash.com/photo-1508344928928-7137b29de216?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Miami', 'Hard Rock']
  },
  {
    id: 'levis',
    name: "Levi's Stadium",
    city: 'San Francisco Bay Area',
    country: 'USA',
    capacity: 68500,
    coordinates: [37.4032, -121.9698],
    description: 'Located in Santa Clara, this highly sustainable stadium features a green roof and solar panels.',
    image: 'https://images.unsplash.com/photo-1628185566367-825000ee794d?q=80&w=1000&auto=format&fit=crop',
    keywords: ['San Francisco', 'Levi', 'Santa Clara']
  },
  {
    id: 'lumen',
    name: 'Lumen Field',
    city: 'Seattle',
    country: 'USA',
    capacity: 69000,
    coordinates: [47.5952, -122.3316],
    description: 'Known for its incredibly loud crowd noise and spectacular views of the downtown Seattle skyline.',
    image: 'https://images.unsplash.com/photo-1585078512128-444cb941e7be?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Seattle', 'Lumen']
  },
  {
    id: 'geha-arrowhead',
    name: 'GEHA Field at Arrowhead Stadium',
    city: 'Kansas City',
    country: 'USA',
    capacity: 76416,
    coordinates: [39.0489, -94.4839],
    description: 'Renowned for having one of the most intimidating and loudest atmospheres in sports.',
    image: 'https://images.unsplash.com/photo-1555543085-78c772c67699?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Kansas City', 'Arrowhead']
  },
  {
    id: 'gillette',
    name: 'Gillette Stadium',
    city: 'Boston',
    country: 'USA',
    capacity: 65878,
    coordinates: [42.0909, -71.2643],
    description: 'Located in Foxborough, Massachusetts, this stadium is a premier venue for both soccer and football.',
    image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Boston', 'Gillette']
  },

  // Canada
  {
    id: 'bmo-field',
    name: 'BMO Field',
    city: 'Toronto',
    country: 'Canada',
    capacity: 30000, // Will be expanded for WC
    coordinates: [43.6332, -79.4186],
    description: 'Located at Exhibition Place in Toronto, it is Canada\'s first soccer-specific stadium.',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Toronto', 'BMO']
  },
  {
    id: 'bc-place',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'Canada',
    capacity: 54500,
    coordinates: [49.2768, -123.1120],
    description: 'Features a large retractable roof and is located in the heart of downtown Vancouver.',
    image: 'https://images.unsplash.com/photo-1521731649168-5e927cde41a8?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Vancouver', 'BC Place']
  },

  // Mexico
  {
    id: 'azteca',
    name: 'Estadio Azteca',
    city: 'Mexico City',
    country: 'Mexico',
    capacity: 83264,
    coordinates: [19.3029, -99.1505],
    description: 'One of the most famous and iconic football stadiums in the world, having hosted two World Cup Finals.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Mexico City', 'Azteca']
  },
  {
    id: 'bbva',
    name: 'Estadio BBVA',
    city: 'Monterrey',
    country: 'Mexico',
    capacity: 53500,
    coordinates: [25.6698, -100.2442],
    description: 'Nicknamed "El Gigante de Acero" (The Steel Giant), it offers stunning views of the Cerro de la Silla mountain.',
    image: 'https://images.unsplash.com/photo-1582299527495-2cde57eaf5bf?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Monterrey', 'BBVA']
  },
  {
    id: 'akron',
    name: 'Estadio Akron',
    city: 'Guadalajara',
    country: 'Mexico',
    capacity: 49850,
    coordinates: [20.6816, -103.4626],
    description: 'Known for its volcano-like design with a grass-covered exterior blending into the landscape.',
    image: 'https://images.unsplash.com/photo-1596245367375-7b3b64bc8c96?q=80&w=1000&auto=format&fit=crop',
    keywords: ['Guadalajara', 'Akron', 'Zapopan']
  }
];
