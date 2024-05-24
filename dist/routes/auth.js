import express from "express";
import { getLoginCode, login, registerUser } from "../controllers/auth.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { getCodeSchema, loginSchema, registerSchema, } from "../schemas/auth.schemas.js";
const router = express.Router();
router.post("/login/:email/code", schemaValidator(getCodeSchema), getLoginCode);
router.post("/login/:email", schemaValidator(loginSchema), login);
router.post("/register", schemaValidator(registerSchema), registerUser);
export default router;
