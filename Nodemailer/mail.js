const express = require('express');
const nodemailer = require('nodemailer');

module.exports.resetPasswordMail = async (email, token) => {
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'chinmay.deolekar1@gmail.com',
            pass: 'zajrfqzhxzzlknal'
        }
    })

    var mailOptions = {
        from: 'chinmay.deolear1@gmail.com',
        to: `${email}`,
        subject: 'Sending Email using NodeMailer',
        text: `${token}`,
        html : `
            <p>Hello, otp to update your password is: otp: ${token} <br> Please enter your new password 
            </p>
        ` 
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        }else {
            console.log('Email sent: ' + info.response);
        }
    })
} 