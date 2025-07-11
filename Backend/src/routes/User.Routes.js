import { Router } from 'express';
import { register, login, getProfile } from '../controllers/User.Controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').post((req, res) => {
  res.send('✅ User route is active');
});

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').post(verifyToken, getProfile);

export default router;