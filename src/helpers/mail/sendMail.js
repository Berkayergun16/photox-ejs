// Modules
import nodemailer from "nodemailer";

// Helpers
import htmlMailTemplate from "./htmlMailTemplate.js";

const mailTo = "berkay.ergun16@gmail.com"

const sendMail = async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
        user: process.env.NODE_MAIL,
        pass: process.env.NODE_MAIL_PASS, 
        },
    });
    await transporter.sendMail({
        to: mailTo, 
        subject: `MAIL FROM ${req.body.email}`, 
        text: "Hello world?", 
        html: htmlMailTemplate(req),
      });

}

export default sendMail;