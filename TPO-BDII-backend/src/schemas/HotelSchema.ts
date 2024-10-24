import mongoose from "../db/mongo-db";

const hotelSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefonos: {
    type: [String],
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
  },
  zona: {
    type: String,
    required: true,
  }
});

const hotelModel = mongoose.model("hotel", hotelSchema);

export { hotelModel };
