const User = require('../database/database');
const bcrypt = require('bcrypt');
const mailer1 = require('../Nodemailer/mail');
const mailer2 = require('../Nodemailer/confirmation_mail');
const crypto = require('crypto');
// const randomstring = require('randomstring');

// const db = require('../database/database');

module.exports.registerService = async ({ name, email, password }) => {
    const result = await User.create({name, email, password});
    if(result) return { success: true, data: result }
    return { success: false, data: result }
}

module.exports.loginService = async ({ email, password }) => {
    const result = await User.findOne({ where: {email}});
    if(result) {
        const flag = await bcrypt.compare(password, result.password)
        if(flag) {
           return { success: true, data: result }
        }else{
            return { success: false }
        }
    }else{
        return { success: false }
    }
}

module.exports.getAdminsService = async () => {
    const result = await User.findAll();
    if(result){
        return { success: true, data: result }
    }else{
        return{ success: false, data: result, message: 'No Users found'}
    }
} 

module.exports.forgotAndUpdatePasswordService = async ({ email }) => {
    const result = await User.findOne({ where: {email : email}});
    if(result) {
        console.log(result);
        const Crypto = crypto.randomBytes(3).toString('hex');
        const random = Crypto.toUpperCase();
        // const random = Math.random() * 100000 + 1
        await mailer1.resetPasswordMail( email , random );
        await User.update({token: random}, {where: {email}});
        return { success: true, message: 'Please check your inbox for otp to set new password'}
    }else{
        return { success: false, message: 'Email not found'}
    }
}

module.exports.resetPasswordService = async ({ password, token }) => {
    const result = await User.findOne({ where: {token: token}});
    // console.log(result)
    if(result){
        const flag = await User.update({ password: password, token: '' }, {where: {token}})
        console.log(flag);
        if(flag) {
            mailer2.confimationMail(result.email);
            return { success: true, message: 'password has been updated'}
        }else {
            return { success: false, message: 'password is not updated'}
        }
    }
}

