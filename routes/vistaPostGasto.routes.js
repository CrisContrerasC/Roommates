import express from 'express';
import {postGasto} from '../controller/gastosHandler.js';

const router = express.Router();

router.post('/', postGasto)

export default router;

