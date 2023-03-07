// Modules
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Models
import User from "../Models/User.js";

const checkUser = asyncHandler(async (req,res,next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if (err) {
             res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
})

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

export { checkUser, authenticateToken };