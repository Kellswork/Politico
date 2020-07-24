import Router from 'express-promise-router';
import User from '../controllers/userController';
import auth from '../middleware/authentication';

const router = new Router();

router.get('/:id', auth, User.getOneUser);

export default router;
