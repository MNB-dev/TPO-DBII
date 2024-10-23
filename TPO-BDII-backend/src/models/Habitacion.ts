import { TipoHabitacionEnum } from "../enum/TipoHabitacionEnum.enum";
import { Amenity } from "./Amenity";

export interface Habitacion {
    id_habitacion: number; // Identificador único de la habitación
    tipo: TipoHabitacionEnum; // Tipo de habitación (ej. individual, doble, suite)
    amenities?:  Amenity[]; // Lista de amenities asociadas a la habitación
    precio: number; // Precio de la habitación
    id_hotel: number; // Identificador único del hotel con que se relaciona
}