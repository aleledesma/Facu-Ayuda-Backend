import express from "express"
import authRoutes from "./auth"
import assignatureRouter from "./assignature"
import majorRouter from "./major"
import fileRouter from "./file"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/assignature", assignatureRouter)
router.use("/major", majorRouter)
router.use("/file", fileRouter)

export default router
