import { Habitacion } from '../models/Habitacion';
import habitacionModel from '../schemas/HabitacionSchema';
import { TipoHabitacionEnum } from '../enum/TipoHabitacionEnum.enum';

class HabitacionRepository {
    
    // Mapear el documento de MongoDB a un objeto Habitacion compatible con la interfaz TypeScript
    private mapToHabitacion(document: any): Habitacion {
        return {
            id_habitacion: document.id_habitacion,
            tipo: document.tipo as TipoHabitacionEnum,  // Casting a TipoHabitacionEnum
            amenities: document.amenities || [],       // Opcional
            precio: document.precio,
            id_hotel: document.id_hotel
        };
    }

    async getAll(): Promise<Habitacion[]> {
        try {
          const productos = await habitacionModel.find().lean();
          return productos.map((data: any) => ({
            ...data,
            id: data._id,
          }));
        } catch (e:any) {
          throw new Error(e);
        }
      }

    // Encontrar una habitación por su ID
    async findById(id_habitacion: number): Promise<Habitacion | null> {
        const habitacion = await habitacionModel.findOne({ id_habitacion }).lean();
        return habitacion ? this.mapToHabitacion(habitacion) : null;
    }

    // Encontrar todas las habitaciones de un hotel por su ID
    async findByHotel(id_hotel: number): Promise<Habitacion[]> {
        const habitaciones = await habitacionModel.find({ id_hotel }).lean();
        return habitaciones.map(this.mapToHabitacion);
    }

    // Crear una nueva habitación
    async create(habitacion: Habitacion): Promise<Habitacion> {
        const nuevaHabitacion = new habitacionModel(habitacion);
        const savedHabitacion = await nuevaHabitacion.save();
        return this.mapToHabitacion(savedHabitacion.toObject());
    }

    // Actualizar una habitación por su ID
    async update(id_habitacion: number, habitacionData: Partial<Habitacion>): Promise<Habitacion | null> {
        const updatedHabitacion = await habitacionModel.findOneAndUpdate(
            { id_habitacion },
            habitacionData,
            { new: true, lean: true } // Retornar el documento actualizado en formato plano
        );

        return updatedHabitacion ? this.mapToHabitacion(updatedHabitacion) : null;
    }

    // Eliminar una habitación por su ID
    async deleteById(id_habitacion: number): Promise<void> {
        await habitacionModel.deleteOne({ id_habitacion });
    }
}

export default HabitacionRepository;
