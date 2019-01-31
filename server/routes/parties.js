import express from 'express';
import { createParty, getAllParties } from '../controllers/Party';

const router = express.Router();

router.post('/', createParty);
router.get('/', getAllParties);

export default router;
