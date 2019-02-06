import express from 'express';
import validateId from '../middleware/validateId';
import validateOffice from '../middleware/validateOffice';
import Office from '../controllers/officeController';
import auth from '../middleware/authentication';
import admin from '../middleware/authorization';

const router = express.Router();

router.post('/', auth, admin, validateOffice, Office.createOffice);

export default router;
