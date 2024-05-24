var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import majorModel from "../models/major";
export const createMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, duration_years, total_hours } = req.body;
    const majorSearched = yield majorModel.findOne({ name });
    if (majorSearched) {
        return res.status(400).json({ message: "la carrera ya existe" });
    }
    try {
        const newMajor = yield majorModel.create({
            name,
            duration_years,
            total_hours,
        });
        return res
            .status(201)
            .json({ ok: true, message: "carrera creada", data: newMajor });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al crear la carrera" });
    }
});
export const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const majors = yield majorModel.find();
        return res
            .status(200)
            .json({ ok: true, message: "carreras obtenidas", data: majors });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al obtener las carreras" });
    }
});
export const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const major = yield majorModel.findById(id);
        if (!major) {
            return res
                .status(404)
                .json({ ok: false, message: "carrera no encontrada" });
        }
        return res
            .status(200)
            .json({ ok: true, message: "carrera obtenida", data: major });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al obtener la carrera" });
    }
});
export const searchByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const majors = yield majorModel.find({
            name: { $regex: name, $options: "i" },
        });
        return res
            .status(200)
            .json({ ok: true, message: "carreras obtenidas", data: majors });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al obtener las carreras" });
    }
});
