import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { Hotel } from '../model/Hotel';
import HotelDao from '../dao/HotelDAO';

const router = express.Router();
const hotelDao = new HotelDao();

// Obtener todos los hoteles
router.get('/', async (req: Request, res: Response) => {
    const response = await hotelDao.getAll();
    res.json(response);
});

// Validaciones para crear hotel
const validateHotelCreation = [
    body('nombre').isString().withMessage('El nombre es obligatorio'),
    body('direccion').isString().withMessage('La dirección es obligatoria'),
    body('telefonos').isArray().withMessage('Los teléfonos deben ser un array').optional(),
    body('correoElectronico').isEmail().withMessage('El correo electrónico debe ser válido'),
    body('zona').isString().withMessage('La zona es obligatoria'),
    body('pois').isArray().withMessage('Los puntos de interés deben ser un array').optional(),
    body('habitaciones').isArray().withMessage('Las habitaciones deben ser un array').optional(),
];

// Crear hotel
router.post('/', validateHotelCreation, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const hotel: Hotel = req.body;
    try {
        const response = await hotelDao.createHotel(hotel);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Validaciones para leer hotel por ID
const validateHotelId = [
    param('id').isNumeric().withMessage('El ID del hotel debe ser un número'),
];

// Leer hotel por ID
router.get('/:id', validateHotelId, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hotel = await hotelDao.getHotel(req.params.id);
        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Validaciones para actualizar hotel
const validateHotelUpdate = [
    param('id').isNumeric().withMessage('El ID del hotel debe ser un número'),
    body('nombre').optional().isString().withMessage('El nombre debe ser un string'),
    body('direccion').optional().isString().withMessage('La dirección debe ser un string'),
    body('telefonos').optional().isArray().withMessage('Los teléfonos deben ser un array'),
    body('correoElectronico').optional().isEmail().withMessage('El correo electrónico debe ser válido'),
    body('zona').optional().isString().withMessage('La zona debe ser un string'),
    body('pois').optional().isArray().withMessage('Los puntos de interés deben ser un array'),
    body('habitaciones').optional().isArray().withMessage('Las habitaciones deben ser un array'),
];

// Actualizar hotel
router.put('/:id', validateHotelId, validateHotelUpdate, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await hotelDao.updateHotel(req.params.id, req.body);
        res.json(response);
    } catch (error) {
        res.status(404).json({ message: 'Hotel no encontrado' });
    }
});

// Validaciones para eliminar hotel
router.delete('/:id', validateHotelId, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await hotelDao.deleteHotel(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: 'Hotel no encontrado' });
    }
});

export default router;
