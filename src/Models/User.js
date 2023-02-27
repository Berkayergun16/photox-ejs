import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        validate: [validator.isAlphanumeric, "Username must be alphanumeric"],
    },
    email: {
        type: String,
        required:[true, "Please provide an email"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    photos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photo",
        },
    ],
},
{
    timestamps: true,
}
);

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;