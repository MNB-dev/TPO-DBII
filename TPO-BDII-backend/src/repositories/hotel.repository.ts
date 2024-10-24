import { Habitacion } from '../models/Habitacion';
import { Hotel } from '../models/Hotel';
import { hotelModel } from '../schemas/HotelSchema';
import HabitacionRepository from './habitacion.repository';

class HotelRepositorio {

  habitacionRepository: any;

  constructor() {
    this.habitacionRepository = new HabitacionRepository();
  }

  async getAll(): Promise<Hotel[]> {
    try {
      const productos = await hotelModel.find().lean();
      return productos.map((data: any) => ({
        ...data,
        id: data._id,
      }));
    } catch (e:any) {
      throw new Error(e);
    }
  }

  async getHotel(id: string): Promise<any | string> {
    try {
      const hotel = await hotelModel.findById(id);
      if (!hotel) return "El hotel no existe.";
      return hotel;
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al obtener el hotel.");
    }
  }

  async createHotel(hotelData: Hotel): Promise<string> {
    try {
        let habitaciones = hotelData.habitaciones || [];
        let habitacionesIds: number[] = [];

        const nuevasHabitaciones: Habitacion[] = await Promise.all(
          (habitaciones as Habitacion[]).map(async (habitacionData) => {
              return await this.habitacionRepository.create(habitacionData);
          })
      );

        const hotel = new hotelModel({
            ...hotelData
        });

        const savedHotel = await hotel.save();
        return `Se creó un hotel con id: ${savedHotel.id}`;
    } catch (e) {
        console.log(e);
        throw new Error(e instanceof Error ? e.message : "Error al crear el hotel.");
    }
  }


  async updateHotel(id: string, hotelData: Hotel): Promise<string> {
    try {
      const hotel = await hotelModel.findByIdAndUpdate(id, hotelData, { new: true });
      if (!hotel) return "El hotel no existe.";
      return "Hotel actualizado.";
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al actualizar el hotel.");
    }
  }

  async deleteHotel(id: string): Promise<string> {
    try {
      const result = await hotelModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) return "El hotel no existe.";
      return "Hotel eliminado.";
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al eliminar el hotel.");
    }
  }
}

export default HotelRepositorio;
