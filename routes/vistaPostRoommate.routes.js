import express from 'express';
import {postRoommate} from '../controller/roommatesHandler.js';

const router = express.Router();

router.post('/', postRoommate)

export default router;