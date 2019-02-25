import multer from 'multer';
import Router from 'express-promise-router';
import User from '../controllers/userController';
import { storage } from '../middleware/multer';
import { validateSignup, validateLogin } from '../middleware/valiadateUser';
import ResetPassword from '../controllers/resetController';
import validateResetPassword from '../middleware/validateResetPassword';

const router = new Router();
const multerUploads = multer({ storage }).single('passportUrl');
router.post('/signup', multerUploads, validateSignup, User.userSignup);

router.post('/login', validateLogin, User.userLogin);
router.post('/reset', ResetPassword.passwordResetEmail);
router.post('/forgot', ResetPassword.isTokenValid);
router.patch('/reset', validateResetPassword, ResetPassword.updateUserPassword);

export default router;
