import Router from 'express-promise-router';
import validateId from '../middleware/validateId';
import { validateOffice, validateRegisterCandidate } from '../middleware/validateOffice';
import Office from '../controllers/officeController';
import auth from '../middleware/authentication';
import admin from '../middleware/authorization';
import Candidate from '../controllers/candidateController';
import validateNominee from '../middleware/validateNominee';

const router = new Router();

router.post('/', auth, admin, validateOffice, Office.createOffice);
router.get('/', auth, Office.getAllOffices);
router.get('/nominees', auth, admin, Candidate.getAllNominees);
router.get('/:id', validateId, auth, Office.getASpecificOffice);
router.post('/nominee', auth, validateNominee, Candidate.addNominee);
router.put('/:id/register', auth, admin, validateRegisterCandidate, Candidate.registerCandidate);
router.get('/:officeId/result', auth, Candidate.electionResult);


export default router;
