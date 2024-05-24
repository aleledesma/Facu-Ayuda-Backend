import { Schema, model, Types } from "mongoose"

const assignatureSchema = new Schema({
  name: { type: String, required: true },
  major_id: { type: Types.ObjectId, required: true, ref: "Major" },
  year: { type: Number, required: true, length: 1 },
  teachers: [String],
  type: { type: String, enum: ["ANUAL", "C1", "C2"], required: true },
  files: { type: [Types.ObjectId], ref: "File" },
  //files? ... urls ? ...
})

const assignatureModel = model("Assignature", assignatureSchema, "assignatures")
export default assignatureModel
