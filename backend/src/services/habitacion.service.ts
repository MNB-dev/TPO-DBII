import HabitacionRepository from '../repositories/habitacion.repository';
import { Habitacion } from '../models/Habitacion';

class HabitacionService {
    private habitacionRepository: HabitacionRepository;

    constructor() {
        this.habitacionRepository = new HabitacionRepository();
    }

    // Obtener todas las habitaciones
    async getAll(): Promise<Habitacion[]> {
        return await this.habitacionRepository.getAll();
      }

    // Obtener una habitación por su ID
    async getHabitacion(id_habitacion: number): Promise<Habitacion | null> {
        return this.habitacionRepository.findById(id_habitacion);
    }

    // Obtener todas las habitaciones de un hotel
    async getHabitacionesPorHotel(id_hotel: number): Promise<Habitacion[]> {
        return this.habitacionRepository.findByHotel(id_hotel);
    }

    // Crear una nueva habitación
    async createHabitacion(habitacion: Habitacion): Promise<Habitacion> {
        return this.habitacionRepository.create(habitacion);
    }

    // Actualizar una habitación existente
    async updateHabitacion(id_habitacion: number, habitacionData: Partial<Habitacion>): Promise<Habitacion | null> {
        return this.habitacionRepository.update(id_habitacion, habitacionData);
    }

    // Eliminar una habitación por su ID
    async deleteHabitacion(id_habitacion: number): Promise<void> {
        await this.habitacionRepository.deleteById(id_habitacion);
    }
}

export default HabitacionService;
