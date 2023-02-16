import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import asyncHandler from "express-async-handler";

const authenticateToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.redirect('/login');
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = await User.findById(user.userId);
        next();
    });
});

export default authenticateToken;