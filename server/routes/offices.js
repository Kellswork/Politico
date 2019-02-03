import express from 'express';
import { createOffice, getAllOffices, getOnePoliticalOffice } from '../controllers/officeController';
import validateId from '../middleware/validateId';
import validaton from '../middleware/officeValidation';
import notFound from '../middleware/notFound';
import offices from '../models/offices';

const router = express.Router();

router.post('/', validaton, createOffice);
router.get('/', notFound(offices), getAllOffices);
router.get('/:id', validateId, getOnePoliticalOffice);

export default router;
