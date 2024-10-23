import { EstadoReservaEnum } from "../enum/EstadoReservaEnum.enum";

export interface Reserva {
    id: number; // Identificador único de la reserva
    codigo_reserva: string; // Código de la reserva
    id_hotel: number; // ID del hotel (referencia a Hotel)
    id_habitacion: number; // ID de la habitación (referencia a Habitacion)
    fecha_inicio: Date; // Fecha de inicio de la reserva
    fecha_salida: Date; // Fecha de salida de la reserva
    estado: EstadoReservaEnum; // Estado de la reserva
    tarifa?: number; //se acuerda únicamente cuando se confirma la reserva.   
    estaConfirmada: boolean;
}