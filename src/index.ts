import express from "express"
import "dotenv/config"
import connectDB from "./db/connect.js"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import "./types/requestCustom.js" //load custom Request props
import "./db/firebase.js" //load firebase config

const app = express()
connectDB()

app.use(
  cors({
    origin: "https://facu-ayuda-frontend.vercel.app/",
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`)
})
