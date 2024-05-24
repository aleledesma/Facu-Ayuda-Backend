import { Schema, Types, model } from "mongoose";
const fileSchema = new Schema({
    name: { type: String, required: true },
    originalName: { type: String, required: true, unique: true }, //orginal file name + uuid
    assignatureId: { type: Types.ObjectId, required: true, ref: "Assignature" },
    state: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        required: true,
    },
    url: { type: String, required: true, unique: true },
    author: { type: Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});
const fileModel = model("File", fileSchema, "files");
export default fileModel;
