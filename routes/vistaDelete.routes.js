import express from 'express';
import { deleteGasto } from '../controller/gastosHandler.js'; 

const router = express.Router();

router.delete('/', deleteGasto )

export default router;