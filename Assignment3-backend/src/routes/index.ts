import { Router } from 'express';
import authRouter from './authRoutes';
import dashboardRouter from './dashboardRoutes';
import downloadRouter from './downloadRoutes';

const router = Router();

router.get('/', (req, res) => {
    res.send('File Sharing App');
});

router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/download', downloadRouter);

export default router;