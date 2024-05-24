var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bucket } from "../db/firebase";
import fileModel from "../models/file";
import assignatureModel from "../models/assignature";
import userModel from "../models/user";
import { v4 as uuidv4 } from "uuid";
export const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, assignatureId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const file = req.file;
    if (!file) {
        return res
            .status(400)
            .json({ ok: false, message: "debe incluir un archivo válido" });
    }
    const fileNameArray = file.originalname.split(".");
    const fileUniqueName = `${fileNameArray[0]}-${uuidv4()}.${fileNameArray[1]}`;
    const bucketFile = bucket.file(`files/${fileUniqueName}`);
    try {
        const assignature = yield assignatureModel.findById(assignatureId);
        if (!assignature) {
            return res
                .status(404)
                .json({ ok: false, message: "la asignatura no existe" });
        }
        const user = yield userModel.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ ok: false, message: "el usuario no existe" });
        }
        //if all is ok: ↓
        yield bucketFile.save(file.buffer);
        const [url] = yield bucketFile.getSignedUrl({
            action: "read",
            expires: "03-09-2099",
        });
        const newFile = yield fileModel.create({
            name,
            originalName: fileUniqueName,
            assignatureId,
            state: "PENDING",
            url,
            author: userId,
        });
        assignature.files.push(newFile._id);
        user.files.push(newFile._id);
        yield assignature.save();
        yield user.save();
        return res.status(200).json({
            ok: true,
            message: "archivo subido correctamente",
            data: newFile,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Ocurrió un error al subir el archivo",
        });
    }
});
//solo files aprobados
export const getFileByAssignature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignatureId } = req.params;
    try {
        const files = yield fileModel.find({ assignatureId, state: "APPROVED" });
        if (files.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "no se encontraron archivos de esa asignatura",
            });
        }
        return res
            .status(200)
            .json({ ok: true, message: "archivos obtenidos", data: files });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: "Ocurrió un error al buscar los archivos" });
    }
});
