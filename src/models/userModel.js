import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
},{
    timestamps: true
});

const user = mongoose.models.users || mongoose.model("users", userSchema);

export default user;