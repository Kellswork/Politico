import express from 'express';
import { createOffice, getAllOffices, getOnePoliticalOffice } from '../controllers/Offices';

const router = express.Router();

router.post('/', createOffice);
router.get('/', getAllOffices);
router.get('/:id', getOnePoliticalOffice);

export default router;
