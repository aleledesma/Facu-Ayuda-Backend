import express from "express"
import authRoutes from "./auth.js"
import assignatureRouter from "./assignature.js"
import majorRouter from "./major.js"
import fileRouter from "./file.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/assignature", assignatureRouter)
router.use("/major", majorRouter)
router.use("/file", fileRouter)

export default router
