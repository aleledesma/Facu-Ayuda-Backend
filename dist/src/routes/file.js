import express from "express";
import { getFileByAssignature, uploadFile } from "../controllers/file";
import { upload } from "../configs/multer";
import { verifySession } from "../middlewares/verifySession";
import { schemaValidator } from "../middlewares/schemaValidator";
import { getFileByAssignatureSchema, uploadFileSchema, } from "../schemas/file.schemas";
const router = express.Router();
router.post("/upload", verifySession, upload.single("file"), schemaValidator(uploadFileSchema), uploadFile);
router.get("/assignature/:assignatureId", schemaValidator(getFileByAssignatureSchema), getFileByAssignature);
export default router;