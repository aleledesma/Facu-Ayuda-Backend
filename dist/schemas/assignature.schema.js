import z from "zod";
//  const { name, major_id, year, teachers, type } = req.body
export const createAssignatureSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(5, { message: "El nombre debe tener mínimo 5 caracteres" })
            .max(35, { message: "El nombre debe tener máximo 35 caracteres" }),
        major_id: z.string(),
        year: z.number().int().min(1, { message: "El año debe ser mayor a 0" }),
        teachers: z
            .array(z.string(), {
            message: "Los profesores deben ser un array de strings",
        })
            .optional(),
        type: z.enum(["ANUAL", "C1", "C2"], {
            message: "El tipo de asignatura debe ser ANUAL, C1 o C2",
        }),
    }),
});
export const getAssignatureByIdSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
