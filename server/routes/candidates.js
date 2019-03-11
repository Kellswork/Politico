import Router from 'express-promise-router';
import auth from '../middleware/authentication';
import admin from '../middleware/authorization';
import Candidate from '../controllers/candidateController';

const router = new Router();


router.get('/', auth, admin, Candidate.getAllCandidates);

export default router;
