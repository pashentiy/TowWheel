const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('../config.js');
const fs = require('fs');

const {
	IsExists, IsExistsOne, Insert, Find, FindOne, CompressImageAndUpload, FindAndUpdate, Delete,
	HandleSuccess, HandleError, HandleServerError,
	ValidateEmail, PasswordStrength, ValidateAlphanumeric, ValidateLength, ValidateMobile, isDataURL, GeneratePassword, Aggregate
} = require('./BaseController');

module.exports = {
	
	getNewsfeeds: async (req, res, next) => {
	
	},
}