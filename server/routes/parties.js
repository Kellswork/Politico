import express from 'express';
import { createParty, getAllParties, getAParty } from '../controllers/Party';

const router = express.Router();

router.post('/', createParty);
router.get('/', getAllParties);
router.get('/:id', getAParty);


export default router;
