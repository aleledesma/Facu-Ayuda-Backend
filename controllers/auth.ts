import { Request, Response } from "express"
import userModel from "../models/user"
import genNumCode from "../helpers/genNumCode"
import sendCodeMail from "../helpers/sendCodeMail"
import jwt from "jsonwebtoken"

export const getLoginCode = async (req: Request, res: Response) => {
  const { email } = req.params
  const { username } = req.body
  const user = await userModel.findOne({ email, username })
  const randomCode = genNumCode(6)
  if (!user) {
    return res.status(404).json({ ok: false, message: "usuario no encontrado" })
  }
  user.login_code = randomCode
  await user.save()
  const mailResult = await sendCodeMail(email, randomCode, res)
  if (!mailResult.ok) {
    return res
      .status(400)
      .json({ ok: false, message: "error al enviar el codigo" })
  } else
    return res
      .status(200)
      .json({ ok: true, message: "codigo enviado correctamente" })
}

export const login = async (req: Request, res: Response) => {
  const { email } = req.params
  const { username, login_code } = req.body
  const user = await userModel.findOne({ email, username })
  if (!user)
    return res.status(404).json({ ok: false, message: "usuario no encontrado" })
  if (user.login_code !== login_code)
    return res.status(400).json({ ok: false, message: "codigo incorrecto" })

  //creating token with jwt
  const tokenPayload = {
    id: user._id,
    email: user.email,
    username: user.username,
    roles: user.roles,
  }
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string)

  res.cookie("jwt", token, {
    // secure: process.env.NODE_ENV === "production",
    // httpOnly: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, //1 week
  })
  return res.status(200).json({
    ok: true,
    message: "sesión iniciada correctamente",
    data: tokenPayload,
  })
}
