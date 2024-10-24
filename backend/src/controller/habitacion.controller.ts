import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import HabitacionService from '../services/habitacion.service';

const router = express.Router();
const habitacionService = new HabitacionService();

// Validaciones para crear o actualizar una habitación
const validateHabitacion = [
    check('id_habitacion').isNumeric().withMessage('El ID de la habitación debe ser numérico'),
    check('tipo').isIn(['individual', 'doble', 'suite']).withMessage('El tipo de habitación es inválido'),
    check('precio').isNumeric().withMessage('El precio debe ser numérico'),
    check('id_hotel').isNumeric().withMessage('El ID del hotel debe ser numérico'),
    check('amenities').optional().isArray().withMessage('Las amenities deben ser un array de strings')
];

// Obtener todas las habitaciones (sin filtros)
router.get('/', async (req: Request, res: Response) => {
    try {
        const habitaciones = await habitacionService.getAll();
        res.json(habitaciones);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener habitaciones por ID del hotel
router.get('/hotel/:id_hotel', [
    check('id_hotel').isNumeric().withMessage('El ID del hotel debe ser numérico')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_hotel } = req.params;
    try {
        const habitaciones = await habitacionService.getHabitacionesPorHotel(parseInt(id_hotel));
        if (habitaciones.length > 0) {
            res.json(habitaciones);
        } else {
            res.status(404).json({ message: 'No se encontraron habitaciones para este hotel' });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una habitación por su ID
router.get('/:id_habitacion', [
    check('id_habitacion').isNumeric().withMessage('El ID de la habitación debe ser numérico')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_habitacion } = req.params;
    try {
        const habitacion = await habitacionService.getHabitacion(parseInt(id_habitacion));
        if (habitacion) {
            res.json(habitacion);
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva habitación
router.post('/', validateHabitacion, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const habitacion = await habitacionService.createHabitacion(req.body);
        res.status(201).json(habitacion);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una habitación existente
router.put('/:id_habitacion', validateHabitacion, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_habitacion } = req.params;
    try {
        const habitacion = await habitacionService.updateHabitacion(parseInt(id_habitacion), req.body);
        if (habitacion) {
            res.json(habitacion);
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una habitación por su ID
router.delete('/:id_habitacion', [
    check('id_habitacion').isNumeric().withMessage('El ID de la habitación debe ser numérico')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_habitacion } = req.params;
    try {
        await habitacionService.deleteHabitacion(parseInt(id_habitacion));
        res.status(204).send();
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
