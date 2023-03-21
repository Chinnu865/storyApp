const nodemailer = require('nodemailer');

module.exports.confimationMail = async (email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'chinmay.deolekar1@gmail.com',
            pass:'zajrfqzhxzzlknal'
        }
    })

    var mailOptions = {
        from: 'chinmay.deolekar1@gmail.com',
        to: `${email}`,
        subject: 'Password change intimation',
        html:`
            <p> Your Password has been changed. If this was not you please contact the admin </p>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        }else{
            console.log('Email sent :'+ info.messageId+ info.response);
        }
    })
}