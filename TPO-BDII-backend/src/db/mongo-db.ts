import mongoose, { ConnectOptions } from 'mongoose';
import fs from 'fs';
import path from 'path';

interface MongoConfig {
    local: any;
    useLocal: boolean;
    compass: {
        uri: string;
    };
}

interface Config {
    mongo: MongoConfig;
}

// Cargar la configuración desde el archivo JSON
function loadConfig(): Config {
    const configPath = path.join(__dirname, 'config.json');
    const configFile = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configFile) as Config;
}

const config = loadConfig();

let url: string = config.mongo.compass.uri;
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
