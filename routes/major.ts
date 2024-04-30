import express from "express"
import {
  createMajor,
  getAll,
  getById,
  searchByName,
} from "../controllers/major"

const router = express.Router()

router.post("/create", createMajor)
router.get("/", getAll)
router.get("/:id", getById)
router.get("/search/:name", searchByName)

export default router
