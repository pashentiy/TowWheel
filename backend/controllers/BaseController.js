const fs = require('fs');
const sharp = require('sharp');
const Config = require('../config.js');

/*
 * Database CURD methods below
 *
 */

const IsExists = async ({model, where = null, select = null}) => {

}

const IsExistsOne = async ({model, where = null, select = null}) => {
	
}

const Insert = async ({model, data}) => {
	
}

const Find = async ({model, where, select = null, sort = null, limit = null, skip = null, populate = null, populateField = null}) => {
	
}

const FindOne = async ({model, where=null, select = null}) => {
	
}

const FindAndUpdate = async ({model, where = {}, update = {}}) => {
	
}

const UpdateMany = async ({model, where, update}) => {
	
}

const Aggregate = async ({model, data}) => {
	
}

const Delete = async ({model, where}) => {
	
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