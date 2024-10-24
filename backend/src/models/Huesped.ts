export interface Huesped {
    id: number; // Identificador único del huésped
    nombre: string; // Nombre del huésped
    apellido: string; // Apellido del huésped
    telefonos: string[]; // Lista de números de teléfono
    correosElectronicos: string[]; // Lista de correos electrónicos
    direccion: {
        calle: string; // Calle del huésped
        numero: string; // Número de la dirección
        codigoPostal: string; // Código postal
        provincia: string; // Provincia
        pais: string; // País
    };
    id_hotel: number; // Identificador único del hotel con que se relaciona
}