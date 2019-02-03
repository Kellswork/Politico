import express from 'express';
import {
  createParty, getAllParties, getAParty, editAParty, deleteAParty,
} from '../controllers/partyController';
import validateParty from '../middleware/validateParty';
import validateId from '../middleware/validateId';
import notFound from '../middleware/notFound';
import parties from '../models/parties';

const router = express.Router();

router.post('/', validateParty, createParty);
router.get('/', notFound(parties), getAllParties);
router.get('/:id', validateId, getAParty);
router.patch('/:id/name', validateId, validateParty, editAParty);
router.delete('/:id', validateId, deleteAParty);


export default router;
