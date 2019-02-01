import express from 'express';
import {
  createParty, getAllParties, getAParty, editAParty, deleteAParty,
} from '../controllers/Party';
import validateParty from '../middleware/validateParty';


const router = express.Router();

router.post('/', validateParty, createParty);
router.get('/', getAllParties);
router.get('/:id', getAParty);
router.patch('/:id/name', validateParty, editAParty);
router.delete('/:id', deleteAParty);


export default router;
