import express from "express"
import { getLoginCode, login, registerUser } from "../controllers/auth"

const router = express.Router()

router.post("/login/:email/code", getLoginCode)
router.post("/login/:email", login)
router.post("/register", registerUser)

export default router
