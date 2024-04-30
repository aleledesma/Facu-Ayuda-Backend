import { Request, Response } from "express"
import assignatureModel from "../models/assignature"
import majorModel from "../models/major"

export const createAssignature = async (req: Request, res: Response) => {
  const { name, major_id, year, teachers, type } = req.body
  const assignatureSearched = await assignatureModel.findOne({ name, major_id })
  if (assignatureSearched) {
    return res
      .status(400)
      .json({ ok: false, message: "la assignatura ya existe" })
  }

  try {
    //buscar el major para no crear una asignatura sin carrera
    const major = await majorModel.findById(major_id)
    if (!major) {
      return res
        .status(404)
        .json({ ok: false, message: "carrera de asignatura no encontrada" })
    }

    const newAssignature = await assignatureModel.create({
      name,
      major_id,
      year,
      teachers,
      type,
    })

    major.assignatures.push(newAssignature._id)
    await major.save()
    return res
      .status(201)
      .json({ ok: true, message: "assignatura creada", data: newAssignature })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al crear la assignatura" })
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const assignatures = await assignatureModel.find()
    return res
      .status(200)
      .json({ ok: true, message: "asignaturas obtenidas", data: assignatures })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al obtener las asignaturas" })
  }
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const assignature = await assignatureModel.findById(id)
    if (!assignature) {
      return res
        .status(404)
        .json({ ok: false, message: "asignatura no encontrada" })
    }
    return res
      .status(200)
      .json({ ok: true, message: "asignatura obtenida", data: assignature })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al obtener la asignatura" })
  }
}

export const getByMajorId = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const assignatures = await assignatureModel.find({ major_id: id })
    if (assignatures.length === 0) {
      return res
        .status(404)
        .json({ ok: false, message: "asignaturas no encontradas" })
    }
    return res
      .status(200)
      .json({ ok: true, message: "asignaturas obtenidas", data: assignatures })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al obtener las asignaturas" })
  }
}
