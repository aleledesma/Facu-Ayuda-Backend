import express from "express";
import { createMajor, getAll, getById, searchByName, } from "../controllers/major";
import { schemaValidator } from "../middlewares/schemaValidator";
import { createMajorSchema, getMajorByIdSchema, searchMajorByNameSchema, } from "../schemas/major.schemas";
const router = express.Router();
router.post("/create", schemaValidator(createMajorSchema), createMajor);
router.get("/", getAll);
router.get("/:id", schemaValidator(getMajorByIdSchema), getById);
router.get("/search/:name", schemaValidator(searchMajorByNameSchema), searchByName);
export default router;
