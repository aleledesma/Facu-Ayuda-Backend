import { Request, Response } from "express"
import userModel from "../models/user.js"
import genNumCode from "../helpers/genNumCode.js"
import sendCodeMail from "../helpers/sendCodeMail.js"
import jwt from "jsonwebtoken"
import majorModel from "../models/major.js"

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
  const mailResult = await sendCodeMail(email, randomCode)
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
    secure: process.env.NODE_ENV === "production",
    httpOnly: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })
  return res.status(200).json({
    ok: true,
    message: "sesión iniciada correctamente",
    data: tokenPayload,
  })
}

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, majorId } = req.body
  try {
    const userSearch = await userModel.findOne({
      $or: [{ username }, { email }],
    })
    if (userSearch) {
      return res.status(400).json({
        ok: false,
        message: "ya existe un usuario con ese nombre o email",
      })
    }
    if (majorId) {
      const major = await majorModel.findById(majorId)
      if (!major) {
        return res.status(404).json({
          ok: false,
          message: "carrera no encontrada",
        })
      }
    }
    const newUser = await userModel.create({
      username,
      email,
      major: majorId,
      login_code: genNumCode(6),
      roles: { admin: false, student: true },
    })
    return res.status(201).json({
      ok: true,
      message: "usuario creado correctamente, ya puedes iniciar sesión",
      data: newUser,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al crear usuario" })
  }
}
