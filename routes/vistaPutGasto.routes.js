import express from 'express';
import { putGasto } from '../controller/gastosHandler.js';

const router = express.Router();

router.put('/', putGasto )

export default router;