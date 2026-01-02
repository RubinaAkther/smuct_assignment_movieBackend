const e = require('express');
const express = require('express');
const router = express();
const { home, register } = require('../controllers/auth.controller.js');

router.route('/').get(home);

router.route('/register').post(register);

module.exports = router;
