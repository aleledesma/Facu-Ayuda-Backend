import { Schema, model, Types } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    major: { type: Types.ObjectId, ref: "Major" },
    login_code: { type: String, required: true, length: 6 },
    roles: {
        type: {
            admin: Boolean,
            student: Boolean,
        },
        required: true,
    },
    files: { type: [Types.ObjectId], ref: "File" },
});
const userModel = model("User", userSchema, "users");
export default userModel;
