import express from 'express';
import {
  createParty, getAllParties, getAParty, editAParty,
} from '../controllers/Party';

const router = express.Router();

router.post('/', createParty);
router.get('/', getAllParties);
router.get('/:id', getAParty);
router.patch('/:id/name', editAParty);


export default router;
