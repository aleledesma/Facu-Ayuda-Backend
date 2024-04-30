import express from "express"
import { getLoginCode, login } from "../controllers/auth"

const router = express.Router()

router.post("/login/:email/code", getLoginCode)
router.post("/login/:email", login)

export default router