import jwt from "jsonwebtoken";
export const verifySession = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res
            .status(401)
            .json({ ok: false, message: "no se encontró la cookie con la sesión" });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ ok: false, message: "sesión no válida" });
    }
};
