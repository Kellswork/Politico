import multer from 'multer';
import Router from 'express-promise-router';
import User from '../controllers/userController';
import { storage } from '../middleware/multer';
import { validateSignup, validateLogin } from '../middleware/valiadateUser';

const router = new Router();
const multerUploads = multer({ storage }).single('passportUrl');
router.post('/signup', multerUploads, validateSignup, User.userSignup);

router.post('/login', validateLogin, User.userLogin);


export default router;
