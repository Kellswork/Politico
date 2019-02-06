import express from 'express';
import validateId from '../middleware/validateId';
import validateOffice from '../middleware/validateOffice';
import Office from '../controllers/officeController';

const router = express.Router();

router.post('/', validateOffice, Office.createOffice);

export default router;
