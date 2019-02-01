import express from 'express';
import {
  createParty, getAllParties, getAParty, editAParty, deleteAParty,
} from '../controllers/Party';
import validateParty from '../middleware/validateParty';
import validateId from '../middleware/validateId';
import findParty from '../middleware/findParties';


const router = express.Router();

router.post('/', validateParty, createParty);
router.get('/', findParty, getAllParties);
router.get('/:id', validateId, getAParty);
router.patch('/:id/name', validateId, validateParty, editAParty);
router.delete('/:id', validateId, deleteAParty);


export default router;
