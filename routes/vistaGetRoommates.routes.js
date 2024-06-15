import express from 'express';
import { getRoommates } from '../controller/roommatesHandler.js'; 

const router = express.Router();

router.get('/', getRoommates )

export default router;