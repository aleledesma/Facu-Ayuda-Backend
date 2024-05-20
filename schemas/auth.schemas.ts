import z from "zod"

export const getCodeSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
      .max(35, {
        message: "El nombre debe tener máximo 35 caracteres",
      }),
  }),
  params: z.object({
    email: z.string().email({
      message: "El email debe ser válido",
    }),
  }),
})

export const loginSchema = getCodeSchema.extend({
  body: getCodeSchema.shape.body.extend({
    login_code: z.string().length(6, {
      message: "El código debe tener 6 caracteres",
    }),
  }),
})

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
      .max(35, {
        message: "El nombre debe tener máximo 35 caracteres",
      }),
    email: z.string().email({
      message: "El email debe ser válido",
    }),
    majorId: z.string().optional(),
  }),
})
