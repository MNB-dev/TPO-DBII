import mongoose, { Schema, Document } from 'mongoose';

export interface HabitacionDocument extends Document {
    id_habitacion: number;
    tipo: string;
    amenities: string[];
    precio: number;
    id_hotel: number;
}

const habitacionSchema: Schema = new Schema({
    id_habitacion: { type: Number, required: true, unique: true },
    tipo: { type: String, required: true },
    amenities: { type: [String], required: false },
    precio: { type: Number, required: true },
    id_hotel: { type: Number, required: true },
});

const habitacionModel = mongoose.model<HabitacionDocument>('Habitacion', habitacionSchema);
export default habitacionModel;