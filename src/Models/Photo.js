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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    url: {
        type: String,
        required: true,
    },
    image_id: {
        type: String,
    },
});

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;