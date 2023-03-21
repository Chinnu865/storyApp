const adminService = require('../service/admin.service');

module.exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const result = await adminService.registerService({ name, email, password });
    console.log(result);
    if(result.success) {
        res.status(200).json({ data: result, message: 'New User created' })
    }else{
        res.status(404).json({ data: result, message: 'User not created' })
    }
}

module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const result = await adminService.loginService({ email, password })
    if(result.success) {
        res.status(200).json({ data: result, messaage: 'Logged in'})
    }else{
        res.status(404).json({ messaage: 'User not found. plz register'})
    }
}

module.exports.getAllAdmins = async (req, res, next) => {
    const result = await adminService.getAdminsService();
    if(result.success) {
        res.status(200).json({ data: result });
    }else{
        res.status(404).json({ data: result })
    }
}

module.exports.logoutAdmin = async (req, res, next) => {
    const result = req.session.destroy();
    if(result) {
        res.status(200).json({ data: result });
    }else{
        res.status(404).json({ data: result })
    }
}

module.exports.forgotAndUpdatePassword = async (req, res, next) => {
    const { email } = req.body;
    const result = await adminService.forgotAndUpdatePasswordService({ email });
    if(result.success = true){
        res.status(200).json({data: result})
    }else{
        res.status(404).json({ message: 'User not found'});
    }
}

module.exports.resetPassword = async (req, res, next) => {
    const { password, token } = req.body;
    const result = await adminService.resetPasswordService({ password, token });
    if(result){
        res.status(200).json({ data: result})
    }else {
        res.status(503).json({ message: 'please enter correct link or token'})
    }
}