const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.TEST_MAIL,
        pass: process.env.MAIL_PASS
    }
});

module.exports = transporter