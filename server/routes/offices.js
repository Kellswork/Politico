import express from 'express';
import { createOffice, getAllOffices } from '../controllers/Offices';

const router = express.Router();

router.post('/', createOffice);
router.get('/', getAllOffices);

export default router;
