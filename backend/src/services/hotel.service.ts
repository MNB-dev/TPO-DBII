import { Hotel } from '../models/Hotel';
import HotelRepositorio from '../repositories/hotel.repository';

class HotelService {
  private repo: HotelRepositorio;

  constructor() {
    this.repo = new HotelRepositorio();
  }

  async getAll(): Promise<Hotel[]> {
    return await this.repo.getAll();
  }

  async getHotel(id: string): Promise<Hotel | string> {
    return await this.repo.getHotel(id);
  }

  async createHotel(hotelData: any): Promise<string> {
    return await this.repo.createHotel(hotelData);
  }

  async updateHotel(id: string, hotelData: any): Promise<string> {
    return await this.repo.updateHotel(id, hotelData);
  }

  async deleteHotel(id: string): Promise<string> {
    return await this.repo.deleteHotel(id);
  }
}

export default HotelService;
