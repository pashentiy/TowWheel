const fs = require('fs');
const sharp = require('sharp');
const Config = require('../config.js');

/*
 * Database CURD methods below
 *
 */

const IsExists = async ({model, where = null, select = null}) => {
	try {
		let query = model.find(where)
		if (select)
			query.select(select)
		let doc = await query.lean().exec()
		if (doc.length > 0)
			return doc
		else
			return false
	}
	catch (e) {
		console.log(e)
		return false
	}
}

const IsExistsOne = async ({model, where = null, select = null}) => {
	
}

const Insert = async ({model, data}) => {
	try {
		let inserted = await new model(data).save()
		return inserted
	}
	catch (e) {
		console.log(e)
		return false
	}
}

const Find = async ({model, where, select = null, sort = null, limit = null, skip = null, populate = null, populateField = null}) => {
	
}

const FindOne = async ({model, where=null, select = null}) => {
	
}

const FindAndUpdate = async ({model, where = {}, update = {}}) => {
	try {
		let query = model.findOneAndUpdate(where, update, { new: true })
		let doc = await query.exec()
		if (doc)
			return doc
		else
			return false
	}
	catch (e) {
		console.log(e)
		return false
	}
}

const UpdateMany = async ({model, where, update}) => {
	
}

const Aggregate = async ({model, data}) => {
	
}

const Delete = async ({model, where}) => {
	try {
		let query = model.deleteMany(where)
		let doc = await query.exec()
		if (doc)
			return true
		else
			return false
	}
	catch (e) {
		console.log(e)
		return false
	}
}

const CompressImageAndUpload = async (image) => {
	
}

const DeleteFile = async (filepath) => {
	
}

// Validation Methods 

const ValidateEmail = email => {
	let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	return re.test(String(email).toLowerCase());
}

const ValidateMobile = mobile => {
	let re = /^\d{11,13}$/
	return re.test(mobile);
}

const ValidateAlphanumeric = text => {
	let re = /^[a-zA-Z0-9\s]+$/
	return re.test(String(text));
}

const ValidateLength = (text, max = 25, min = 1) => {
	return (text.length >= min && text.length <= max) ? true : false;
}

const PasswordStrength = password => {
	let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,24})(?=.*[0-9])(?=.*[@$!%*#?&])/
	return re.test(password);
}

const isDataURL = (s)=>{
	let regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    return !!s.match(regex);
}

const GeneratePassword = (length = 16) => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/*
 * Error Handling methods below
 *
 */

const HandleSuccess = (res, data) => {
	res.status(200).json(data);
	res.end();
}

const HandleError = (res, message) => {
	res.status(202).json({
		error: message
	});
	res.end();
}

const HandleServerError = (res, req, err) => {
	/*
	 * Can log the error data into files to recreate and fix issue.
	 * Hiding stack stace from users.
	 */
	const errLog = { method: req.method, url: req.originalUrl, params: req.params, query: req.query, post: req.body, error: err }
	// Temporary console log for debug mode
	console.log(errLog)
	res.status(500).json({
		error: 'Something went wrong. Please contact support team.'
	});
}

exports.IsExists = IsExists
exports.Insert = Insert
exports.FindAndUpdate = FindAndUpdate
exports.Delete = Delete
exports.HandleSuccess = HandleSuccess
exports.HandleError = HandleError
exports.HandleServerError = HandleServerError
exports.ValidateMobile = ValidateMobile
exports.GeneratePassword = GeneratePassword
