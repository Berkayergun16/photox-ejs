import mongoose from "mongoose";

const connectDb = async() => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        });
    
        console.log(`MongoDB Connected: 🚀`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;