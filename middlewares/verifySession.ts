import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { UserInterface } from "../types/userInterface"

export const verifySession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt
  if (!token) {
    return res
      .status(401)
      .json({ ok: false, message: "no se encontró la cookie con la sesión" })
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = user as UserInterface
    next()
  } catch (error) {
    return res.status(401).json({ ok: false, message: "sesión no válida" })
  }
}
