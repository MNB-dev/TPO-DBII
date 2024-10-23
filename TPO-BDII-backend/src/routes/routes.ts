import express from 'express';
import hotelController from '../controller/hotel.controller'; 
import habitacionController from '../controller/habitacion.controller';

const router = express.Router();

router.use('/hoteles', hotelController);
router.use('/habitacion', habitacionController);

export default router;
