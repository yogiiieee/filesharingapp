import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { deleteFileController, downloadFileController, getFilesController, updateSharingController, upload, uploadFileController } from "../controllers/dashboardController";

const dashboardRouter = Router();

dashboardRouter.get('/', authMiddleware, (req: Request, res: Response) => {
    res.send('Dashboard');
});

dashboardRouter.get('/files', authMiddleware, getFilesController);
dashboardRouter.post('/upload', authMiddleware, upload.single('file'), uploadFileController);
dashboardRouter.put('/sharing/:fileId', authMiddleware, updateSharingController);
dashboardRouter.get('/download/:fileId', authMiddleware, downloadFileController);
dashboardRouter.delete('/delete/:fileId', authMiddleware, deleteFileController);

export default dashboardRouter;