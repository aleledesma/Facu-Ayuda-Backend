import { ZodError } from "zod";
export const schemaValidator = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json(error.issues.map((issue) => ({
                    path: issue.path,
                    message: issue.message,
                })));
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};