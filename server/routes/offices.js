import express from 'express';
import { createOffice, getAllOffices, getOnePoliticalOffice } from '../controllers/Offices';
import validateOffice from '../middleware/validateOffice';
import validateId from '../middleware/validateId';
import findOffice from '../middleware/findOffices';

const router = express.Router();

router.post('/', validateOffice, createOffice);
router.get('/', findOffice, getAllOffices);
router.get('/:id', validateId, getOnePoliticalOffice);

export default router;
