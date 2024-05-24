import z from "zod";
export const uploadFileSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(5, { message: "El nombre debe tener al menos 5 caracteres" })
            .max(50, { message: "El nombre debe tener como máximo 50 caracteres" }),
        assignatureId: z.string().min(1, { message: "id inválido" }),
    }),
});
export const getFileByAssignatureSchema = z.object({
    params: z.object({
        assignatureId: z.string().min(1, { message: "id inválido" }),
    }),
});
