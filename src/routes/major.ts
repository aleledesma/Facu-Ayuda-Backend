import express from "express"
import {
  createMajor,
  getAll,
  getById,
  searchByName,
} from "../controllers/major.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import {
  createMajorSchema,
  getMajorByIdSchema,
  searchMajorByNameSchema,
} from "../schemas/major.schemas.js"

const router = express.Router()

router.post("/create", schemaValidator(createMajorSchema), createMajor)
router.get("/", getAll)
router.get("/:id", schemaValidator(getMajorByIdSchema), getById)
router.get(
  "/search/:name",
  schemaValidator(searchMajorByNameSchema),
  searchByName
)

export default router
