import type { Bicycle } from '../types/bicycle'

const bicycles: Bicycle[] = [
  { id: 'aljibe', name: 'Aljibe City', category: 'Urbana', description: 'Postura cómoda y guardabarros para tus desplazamientos diarios.', image: new URL('../images/aljibe.jpg', import.meta.url).href, price: 549, available: true },
  { id: 'caldera', name: 'Caldera Gravel', category: 'Gravel', description: 'Cubiertas mixtas para alternar asfalto y pistas de tierra.', image: new URL('../images/caldera.jpg', import.meta.url).href, price: 989, available: true },
  { id: 'pinar', name: 'Pinar Trail', category: 'Montaña', description: 'Suspensión delantera para rutas con terreno irregular.', image: new URL('../images/pinar.jpg', import.meta.url).href, price: 749, available: false },
]

export function getBicycles(): readonly Bicycle[] {
  return bicycles
}

export const formatPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format
