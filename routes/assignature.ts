import express from "express"
import {
  createAssignature,
  getAll,
  getById,
  getByMajorId,
} from "../controllers/assignature"

const router = express.Router()

router.post("/create", createAssignature)
router.get("/", getAll)
router.get("/:id", getById)
router.get("/major/:id", getByMajorId)

export default router
