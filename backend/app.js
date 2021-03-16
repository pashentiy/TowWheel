const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileupload = require("express-fileupload");



//Init DB Connection
mongoose.connect("", { auth:{authdb:"admin"}, useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true, useCreateIndex: true, useFindAndModify: false })
.then((e) => console.log('DB Connected.'))
.catch(error => { console.log(error) });

//Init app server
const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.use(bodyParser.raw({ limit: '50mb'}) );
app.use(fileupload({
	limits: { fileSize: 50 * 1024 * 1024 },
	debug: false,
}));
app.use(express.static('public'))

