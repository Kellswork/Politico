import Router from 'express-promise-router';
import User from '../controllers/userController';
import { multerUploads, dataUri } from '../middleware/multer';
import validateUser from '../middleware/valiadateUser';

const router = new Router();

router.post('/signup', multerUploads, validateUser, User.userSignup);

export default router;
