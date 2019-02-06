import Router from 'express-promise-router';
import multer from 'multer';
import validateParty from '../middleware/validateParty';
import Party from '../controllers/partyController';
import { storage } from '../middleware/multer';
import auth from '../middleware/authentication';
import admin from '../middleware/authorization';

const router = new Router();
const multerUploads = multer({ storage }).single('logoUrl');
router.post('/', auth, admin, multerUploads, validateParty, Party.createParty);


export default router;
