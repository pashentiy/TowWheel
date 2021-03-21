const express = require('express');
const router = express.Router();

const Controllers = require('../controllers')
const Home = Controllers.Home


//router.get('/get-newsfeeds',Home.getNewsfeeds);

module.exports = router;