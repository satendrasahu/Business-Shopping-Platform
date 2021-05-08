const express = require('express');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();
const { adminMiddleware, requireSignin } = require('../../common.middleware');

router.post('/initialData', requireSignin, adminMiddleware, initialData);

module.exports = router;