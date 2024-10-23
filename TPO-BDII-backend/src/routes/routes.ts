import express from 'express';
import hotelController from '../controller/hotel.controller'; 

const router = express.Router();

router.use('/hoteles', hotelController);

export default router;
