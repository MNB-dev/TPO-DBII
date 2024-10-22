import ServicioHotel from '../services/hotel.service';

class HotelDao {
  private servicio: ServicioHotel;

  constructor() {
    this.servicio = new ServicioHotel();
  }

  async getAll() {
    return await this.servicio.getAll();
  }

  async getHotel(id: string): Promise<any | string> {
    return await this.servicio.getHotel(id);
  }

  async getAllHotels(): Promise<any[]> {
    return await this.servicio.getAllHotels();
  }

  async createHotel(hotelData: any): Promise<string> {
    return await this.servicio.createHotel(hotelData);
  }

  async updateHotel(id: string, hotelData: any): Promise<string> {
    return await this.servicio.updateHotel(id, hotelData);
  }

  async deleteHotel(id: string): Promise<string> {
    return await this.servicio.deleteHotel(id);
  }
}

export default HotelDao;
