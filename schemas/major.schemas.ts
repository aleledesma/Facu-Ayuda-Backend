import z from "zod"

//  const { name, duration_years, total_hours } = req.body

export const createMajorSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(5, { message: "El nombre debe tener mínimo 5 caracteres" })
      .max(70, { message: "El nombre debe tener máximo 70 caracteres" }),
    duration_years: z
      .number()
      .int()
      .min(1, { message: "La duración debe ser mayor a 0" }),
    total_hours: z
      .number()
      .int()
      .min(1, { message: "Las horas totales deben ser mayor a 0" }),
  }),
})

export const getMajorByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export const searchMajorByNameSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
})
