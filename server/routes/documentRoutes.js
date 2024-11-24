import { Router } from 'express';
import * as documentController from '../controllers/documentController.js';
import * as authController from '../controllers/authController.js';

const router = Router();

router.get(
    "/:id/content/public",
    documentController.getPublicDocContent
)

router.use(authController.protect);

router.get('/recent', documentController.getRecentDocs);

router.get(
    "/:id/content",
    documentController.getDocContent
)

router.post(
    "/upload",
    documentController.uploadDoc,
    documentController.createDoc
);

router.use(authController.restrictTo("admin", "manager"));

router.get(
    "/status/pending",
    documentController.getAllPendingDocs
)

router.patch(
    "/:id",
    documentController.updateDocument
)

router.get(
    "/",
    documentController.getAllDocs
)

router.delete("/:id", 
    authController.restrictTo("admin"),
    documentController.deleteDoc
);

export default router;