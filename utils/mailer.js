const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS
    }
});

const sendEmailForForgotPassword = async(to, subject, text) => {
    const mail = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    }
    return transporter.sendMail(mail);
}

module.exports = sendEmailForForgotPassword;