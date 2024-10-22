import dotenv from 'dotenv';

dotenv.config();

let carritoDao: any; // Cambia 'any' por el tipo adecuado si tienes una interfaz o clase
let productosDao: any; // Cambia 'any' por el tipo adecuado si tienes una interfaz o clase

switch (process.env.SERVICE) {
    case 'mongodb': {
        const { default: CarritoDaoMongoDb }: any = import('./CarritoMongoDb.js');
        carritoDao = new CarritoDaoMongoDb();
        break;
    }
    default: {
        break;
    }
}

export { carritoDao, productosDao };