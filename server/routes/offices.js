import Router from 'express-promise-router';
import validateId from '../middleware/validateId';
import { validateOffice, validateCandidate } from '../middleware/validateOffice';
import Office from '../controllers/officeController';
import auth from '../middleware/authentication';
import admin from '../middleware/authorization';
import Candidate from '../controllers/candidateController';

const router = new Router();

router.post('/', auth, admin, validateOffice, Office.createOffice);
router.get('/', auth, Office.getAllOffices);
router.get('/:id', validateId, auth, Office.getASpecificOffice);
router.post('/:userId/register', auth, admin, validateCandidate, Candidate.registerCandidate);
router.get('/:officeId/result', Candidate.electionResult);

export default router;
