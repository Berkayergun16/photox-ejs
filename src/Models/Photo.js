import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true,
    },
    description: {
        type: String,
        required: true,
        trim : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;