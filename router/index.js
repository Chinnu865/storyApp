const { registerUser, loginUser, getAllAdmins, logoutAdmin, resetPassword, forgotAndUpdatePassword } = require('../controller/admin.controller');

const router = require('express').Router();

router.post('/admin/register', registerUser);
router.post('/admin/login', loginUser);
router.get('/admin/all', getAllAdmins);
router.post('/admin/logout', logoutAdmin);
router.post('/admin/forgetPassword', forgotAndUpdatePassword);
router.get('/admin/resetPassword', resetPassword);

module.exports = router;