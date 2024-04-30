import express from "express"
import { getFileByAssignature, uploadFile } from "../controllers/file"
import { upload } from "../configs/multer"
import { verifySession } from "../middlewares/verifySession"

const router = express.Router()

router.post("/upload", upload.single("file"), verifySession, uploadFile as any)
router.get("/assignature/:assignatureId", getFileByAssignature)

export default router
