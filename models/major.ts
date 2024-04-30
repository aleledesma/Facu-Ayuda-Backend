import {Schema, Types, model} from "mongoose"

const majorSchema = new Schema({
    name: {type: String, unique: true, required: true},
    assignatures: {type: [Types.ObjectId], ref: "Assignature"},
    duration_years: Number,
    total_hours: Number
})

const majorModel = model("Major", majorSchema, "majors")
export default majorModel