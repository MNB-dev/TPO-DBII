import HotelRepositorio from '../repository/hotel.repository';

class HotelService {
  private repo: HotelRepositorio;

  constructor() {
    this.repo = new HotelRepositorio();
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getHotel(id: string): Promise<any | string> {
    return await this.repo.getHotel(id);
  }

  async getAllHotels(): Promise<any[]> {
    return await this.repo.getAllHotels();
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
