import mongoose from "../db/mongo-db";
import ContenedorProductoMongoDb from "./ContenedorProductoMongoDb";

interface Producto {
  producto: string;
}

const carritoSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  productos: [{ producto: String }],
});

const carritoModel = mongoose.model("carrito", carritoSchema);

class ContenedorCarritoMongoDb {
  constructor() {}

  async getProducts(id: string): Promise<Producto[] | string> {
    try {
      const contenedorProductos = new ContenedorProductoMongoDb();
      const carrito = await carritoModel.findById(id);
      const productos: Producto[] = [];

      if (!carrito) return "El carrito no existe.";

      for (let index = 0; index < carrito.productos.length; index++) {
        const element = carrito.productos[index];
/*         const p = await contenedorProductos.getById(element.producto);
        productos.push(p); */
      }

      return productos; 
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al obtener los productos.");
    }
  }

  async addProducto(id: string, id_prod: string): Promise<string | void> {
    try {
      const contenedorProductos = new ContenedorProductoMongoDb();
      const p = await contenedorProductos.getById(id_prod); 

      if (!p) return "El producto no existe.";

      const carrito = await carritoModel.findByIdAndUpdate(id, {
        $push: { productos: { producto: id_prod } },
      });

      if (!carrito) return "El carrito no existe.";

      return;
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al agregar el producto.");
    }
  }

  async deleteProducto(id: string, id_prod: string): Promise<string> {
    try {
      const carrito = await carritoModel.findByIdAndUpdate(
        id,
        { $pull: { productos: { producto: id_prod } } }
      );

      return "Producto eliminado del carrito.";
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al eliminar el producto.");
    }
  }

  async createCarrito(): Promise<string> {
    try {
      const carrito = new carritoModel({
        timestamp: Date.now(),
        productos: [],
      });

      const c = await carrito.save();
      return `Se creó un carrito con id: ${c.id}`;
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al crear el carrito.");
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const c = await carritoModel.deleteOne({ _id: id });

      if (c.deletedCount === 0) return "El carrito no existe.";

      return "Carrito eliminado";
    } catch (e) {
      console.log(e);
      throw new Error(e instanceof Error ? e.message : "Error al eliminar el carrito.");
    }
  }
}

export default ContenedorCarritoMongoDb;
