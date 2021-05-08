const { Router } = require('express');
const express = require('express');
const { signup, signin, signout, } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidate, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();
//const { requireSignin } = require('../../common.middleware');


router.post('/admin/signup', validateSignupRequest, isRequestValidate, signup);

router.post('/admin/signin', validateSigninRequest, isRequestValidate, signin);

router.post('/admin/signout', signout);

module.exports = router;