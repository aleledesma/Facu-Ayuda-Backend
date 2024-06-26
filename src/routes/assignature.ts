import express from "express"
import {
  createAssignature,
  getAll,
  getById,
  getByMajorId,
} from "../controllers/assignature.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import {
  createAssignatureSchema,
  getAssignatureByIdSchema,
} from "../schemas/assignature.schema.js"

const router = express.Router()

router.post(
  "/create",
  schemaValidator(createAssignatureSchema),
  createAssignature
)
router.get("/", getAll)
router.get("/:id", schemaValidator(getAssignatureByIdSchema), getById)
router.get(
  "/major/:id",
  schemaValidator(getAssignatureByIdSchema),
  getByMajorId
)

export default router
