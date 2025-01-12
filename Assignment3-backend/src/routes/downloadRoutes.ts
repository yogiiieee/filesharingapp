import { Router } from 'express';
import { downloadFileWithLinkController } from '../controllers/downloadController';

const downloadRouter = Router();

downloadRouter.get('/:uuid', downloadFileWithLinkController);

export default downloadRouter;