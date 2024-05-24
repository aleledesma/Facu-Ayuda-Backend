import { Request, Response } from "express"
import majorModel from "../models/major.js"

export const createMajor = async (req: Request, res: Response) => {
  const { name, duration_years, total_hours } = req.body
  const majorSearched = await majorModel.findOne({ name })
  if (majorSearched) {
    return res.status(400).json({ message: "la carrera ya existe" })
  }

  try {
    const newMajor = await majorModel.create({
      name,
      duration_years,
      total_hours,
    })
    return res
      .status(201)
      .json({ ok: true, message: "carrera creada", data: newMajor })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al crear la carrera" })
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const majors = await majorModel.find()
    return res
      .status(200)
      .json({ ok: true, message: "carreras obtenidas", data: majors })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al obtener las carreras" })
  }
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const major = await majorModel.findById(id)
    if (!major) {
      return res
        .status(404)
        .json({ ok: false, message: "carrera no encontrada" })
    }
    return res
      .status(200)
      .json({ ok: true, message: "carrera obtenida", data: major })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al obtener la carrera" })
  }
}

export const searchByName = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const majors = await majorModel.find({
      name: { $regex: name, $options: "i" },
    })
    return res
      .status(200)
      .json({ ok: true, message: "carreras obtenidas", data: majors })
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "error al obtener las carreras" })
  }
}
