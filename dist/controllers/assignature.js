var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import assignatureModel from "../models/assignature.js";
import majorModel from "../models/major.js";
export const createAssignature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, major_id, year, teachers, type } = req.body;
    const assignatureSearched = yield assignatureModel.findOne({ name, major_id });
    if (assignatureSearched) {
        return res
            .status(400)
            .json({ ok: false, message: "la assignatura ya existe" });
    }
    try {
        //buscar el major para no crear una asignatura sin carrera
        const major = yield majorModel.findById(major_id);
        if (!major) {
            return res
                .status(404)
                .json({ ok: false, message: "carrera de asignatura no encontrada" });
        }
        const newAssignature = yield assignatureModel.create({
            name,
            major_id,
            year,
            teachers,
            type,
        });
        major.assignatures.push(newAssignature._id);
        yield major.save();
        return res
            .status(201)
            .json({ ok: true, message: "assignatura creada", data: newAssignature });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al crear la assignatura" });
    }
});
export const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignatures = yield assignatureModel.find();
        return res
            .status(200)
            .json({ ok: true, message: "asignaturas obtenidas", data: assignatures });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al obtener las asignaturas" });
    }
});
export const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const assignature = yield assignatureModel.findById(id);
        if (!assignature) {
            return res
                .status(404)
                .json({ ok: false, message: "asignatura no encontrada" });
        }
        return res
            .status(200)
            .json({ ok: true, message: "asignatura obtenida", data: assignature });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al obtener la asignatura" });
    }
});
export const getByMajorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const assignatures = yield assignatureModel.find({ major_id: id });
        if (assignatures.length === 0) {
            return res
                .status(404)
                .json({ ok: false, message: "asignaturas no encontradas" });
        }
        return res
            .status(200)
            .json({ ok: true, message: "asignaturas obtenidas", data: assignatures });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "error al obtener las asignaturas" });
    }
});
