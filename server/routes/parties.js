import express from 'express';
import createParty from '../controllers/Party';

const router = express.Router();

router.post('/', createParty);

export default router;
