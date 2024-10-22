import { Habitacion } from "./Habitacion";
import { POI } from "./POI";

export interface Hotel {
    id: number; // Identificador único del hotel
    nombre: string; // Nombre del hotel
    direccion: string; // Dirección del hotel
    telefonos: string[]; // Lista de números de teléfono
    correoElectronico: string; // Correo electrónico habitual
    zona: string; // Zona de la ciudad (ej. museos, estadios)
    pois?: POI[]; // Lista de puntos de interés relacionados
    habitaciones?: Habitacion[]; // Lista de habitaciones ofrecidas
}