import { Router } from 'express';
import { signupController, loginController, logoutController } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', signupController );
authRouter.post('/login', loginController );
authRouter.post('/logout', logoutController );

export default authRouter;