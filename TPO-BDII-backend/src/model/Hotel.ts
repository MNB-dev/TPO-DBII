import { Amenity } from "./Amenity";
import { POI } from "./POI";

export interface Hotel {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string[];
    email: string;
    zona: string[];
    amenities: Amenity[];
    puntosDeInteres: POI[];
}