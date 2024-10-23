import { TipoPOIEnum } from "../enum/TipoPOIEnum.enum";

export interface POI {
    id: number; // Identificador único del POI
    nombre: string; // Nombre del punto de interés
    tipo: TipoPOIEnum; // Tipo de POI (ej. museo, parque, estadio)
    valor: string; // Detalle de valor para los huéspedes
}