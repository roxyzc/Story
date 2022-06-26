import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
},{timestamps: true});

const User = mongoose.model("UserGoogle", UserSchema);
export default User;