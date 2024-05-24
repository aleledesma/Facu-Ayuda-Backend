import express from "express"
import { getFileByAssignature, uploadFile } from "../controllers/file.js"
import { upload } from "../configs/multer.js"
import { verifySession } from "../middlewares/verifySession.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import {
  getFileByAssignatureSchema,
  uploadFileSchema,
} from "../schemas/file.schemas.js"

const router = express.Router()

router.post(
  "/upload",
  verifySession,
  upload.single("file"),
  schemaValidator(uploadFileSchema),
  uploadFile as any
)
router.get(
  "/assignature/:assignatureId",
  schemaValidator(getFileByAssignatureSchema),
  getFileByAssignature
)

export default router
