import express from 'express';
import { getGastos } from '../controller/gastosHandler.js'; 

const router = express.Router();

router.get('/', getGastos )

export default router;