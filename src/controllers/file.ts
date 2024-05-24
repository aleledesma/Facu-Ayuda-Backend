import { Request, Response } from "express"
import { bucket } from "../db/firebase.js"
import fileModel from "../models/file.js"
import assignatureModel from "../models/assignature.js"
import userModel from "../models/user.js"
import { v4 as uuidv4 } from "uuid"
import { Multer } from "multer"

interface MulterRequest extends Request {
  file: Express.Multer.File
}

export const uploadFile = async (req: MulterRequest, res: Response) => {
  const { name, assignatureId } = req.body
  const userId = req.user?.id
  const file = req.file
  if (!file) {
    return res
      .status(400)
      .json({ ok: false, message: "debe incluir un archivo válido" })
  }
  const fileNameArray = file.originalname.split(".")
  const fileUniqueName = `${fileNameArray[0]}-${uuidv4()}.${fileNameArray[1]}`
  const bucketFile = bucket.file(`files/${fileUniqueName}`)
  try {
    const assignature = await assignatureModel.findById(assignatureId)
    if (!assignature) {
      return res
        .status(404)
        .json({ ok: false, message: "la asignatura no existe" })
    }
    const user = await userModel.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ ok: false, message: "el usuario no existe" })
    }
    //if all is ok: ↓
    await bucketFile.save(file.buffer)
    const [url] = await bucketFile.getSignedUrl({
      action: "read",
      expires: "03-09-2099",
    })
    const newFile = await fileModel.create({
      name,
      originalName: fileUniqueName,
      assignatureId,
      state: "PENDING",
      url,
      author: userId,
    })
    assignature.files.push(newFile._id)
    user.files.push(newFile._id)
    await assignature.save()
    await user.save()

    return res.status(200).json({
      ok: true,
      message: "archivo subido correctamente",
      data: newFile,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: "Ocurrió un error al subir el archivo",
    })
  }
}

//solo files aprobados
export const getFileByAssignature = async (req: Request, res: Response) => {
  const { assignatureId } = req.params
  try {
    const files = await fileModel.find({ assignatureId, state: "APPROVED" })
    if (files.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "no se encontraron archivos de esa asignatura",
      })
    }
    return res
      .status(200)
      .json({ ok: true, message: "archivos obtenidos", data: files })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Ocurrió un error al buscar los archivos" })
  }
}
