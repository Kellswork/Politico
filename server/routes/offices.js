import express from 'express';
import createOffice from '../controllers/Offices';

const router = express.Router();

router.post('/', createOffice);

export default router;
