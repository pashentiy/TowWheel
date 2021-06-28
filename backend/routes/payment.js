const express = require('express');
const router = express.Router();

const Controllers = require('../controllers')
const Payment = Controllers.Payment


router.post('/beginTransaction',Payment.beginTransaction);


module.exports = router;