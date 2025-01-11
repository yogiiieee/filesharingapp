import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { deleteFileController, downloadFileController, getAllFilesController, updateSharingController, upload, uploadFileController } from "../controllers/dashboardController";

const dashboardRouter = Router();

dashboardRouter.get('/', authMiddleware, (req: Request, res: Response) => {
    res.send('Dashboard');
});

dashboardRouter.get('/files', authMiddleware, getAllFilesController);
// dashboardRouter.get('/shared', authMiddleware);
dashboardRouter.post('/upload', authMiddleware, upload.single('file'), uploadFileController);
dashboardRouter.put('/sharing', authMiddleware, updateSharingController);
dashboardRouter.get('/download/:fileId', authMiddleware, downloadFileController);
dashboardRouter.delete('/delete/:fileId', authMiddleware, deleteFileController);

export default dashboardRouter;