import mongoose, { ConnectOptions } from 'mongoose';
import config from '../../config.js';

let url: string = "";
let options: ConnectOptions = {};

if (config.mongo.useLocal) {
    url = config.mongo.local.url;
    options = { };
} else {
    url = config.mongo.compass.uri;
    options = { };
}

mongoose.connect(url, options)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        throw error;
    });

export default mongoose;
