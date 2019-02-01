import express from 'express';
import { createOffice, getAllOffices, getOnePoliticalOffice } from '../controllers/Offices';
import validateOffice from '../middleware/validateOffice';

const router = express.Router();

router.post('/', validateOffice, createOffice);
router.get('/', getAllOffices);
router.get('/:id', getOnePoliticalOffice);

export default router;
