import { Model } from 'mongoose';
import mongoose from '../db/mongo-db';

// Define la interfaz para el Producto
interface IProducto extends Document {
  name: string;
  description?: string;
  price: number;
  code: number;
  stock: number;
  picture?: string;
  timestamp: Date;
}

// Define el esquema del producto
const productosSchema = new mongoose.Schema<IProducto>({
  name: {
    type: String,
    required: true, // Cambia esto
    minlength: 3, // Esto no necesita un arreglo, ya que es un solo número
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true, // Cambia esto
    min: 1,
  },
  code: {
    type: Number,
    required: true, // Cambia esto
    min: 5,
  },
  stock: {
    type: Number,
    required: true, // Cambia esto
    min: 1,
  },
  picture: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define el modelo de producto
const productosModel: Model<IProducto> = mongoose.model<IProducto>("productos", productosSchema);

class ContenedorProductoMongoDb {
  constructor() {}

  async getAll(): Promise<IProducto[]> {
    try {
      const productos = await productosModel.find();
      return productos;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : "Error al obtener los productos.");
    }
  }

  async getById(id: string): Promise<IProducto | string | null> {
    try {
      const producto = await productosModel.findById(id);

      if (!producto) return "El producto no existe.";

      return producto;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async create(body: IProducto): Promise<IProducto> {
    try {
      const producto = new productosModel({
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
      });

      return await producto.save();
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : "Error al crear el producto.");
    }
  }

  async update(id: string, body: Partial<IProducto>): Promise<void | string> {
    try {
      const producto = await productosModel.updateOne(
        { _id: id },
        body
      );

      if (producto.modifiedCount === 0) return "El producto no tiene ninguna modificación o no existe.";

      return;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : "Error al actualizar el producto.");
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const producto = await productosModel.deleteOne({ _id: id });

      if (producto.deletedCount === 0) return "El producto no existe.";

      return "Producto eliminado";
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : "Error al eliminar el producto.");
    }
  }
}

export default ContenedorProductoMongoDb;
