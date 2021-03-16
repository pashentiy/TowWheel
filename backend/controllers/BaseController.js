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
