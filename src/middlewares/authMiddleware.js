import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import asyncHandler from "express-async-handler";
const authenticateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
        if (err) return res.sendStatus(403);
        req.user = await User.findById(user.userId);
        next();
    });
});

export default authenticateToken;