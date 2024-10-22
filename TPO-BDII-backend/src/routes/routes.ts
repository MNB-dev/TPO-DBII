import express from 'express';
import hotelRoute from './hotelRoute'; 

const router = express.Router();

router.use('/hoteles', hotelRoute);

export default router;
