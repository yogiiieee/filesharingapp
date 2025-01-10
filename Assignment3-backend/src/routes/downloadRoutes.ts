import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { downloadFileWithLinkController } from '../controllers/downloadController';

const downloadRouter = Router();

downloadRouter.get('/:uuid', authMiddleware, downloadFileWithLinkController);

export default downloadRouter;