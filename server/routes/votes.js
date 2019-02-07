import Router from 'express-promise-router';
import Candidate from '../controllers/candidateController';
import auth from '../middleware/authentication';
import validateVote from '../middleware/validateVote';

const router = new Router();
router.post('/', auth, validateVote, Candidate.vote);
export default router;
