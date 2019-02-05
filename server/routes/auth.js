import Router from 'express-promise-router';
import User from '../controllers/userController';
import { multerUploads, dataUri } from '../middleware/multer';
import { validateSignup, validateLogin } from '../middleware/valiadateUser';

const router = new Router();

router.post('/signup', multerUploads, validateSignup, User.userSignup);

router.post('/login', validateLogin, User.userLogin);


export default router;
