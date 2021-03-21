const jwt = require('jsonwebtoken');
const Config = require('../config.js');
const { MigrateSchema } = require('./migrateSchema')
const { UnauthorizedError, IsExists, FindAndUpdate } = require('../controllers/BaseController')
const { User } = require('../models')

const VerifyToken = (req, res, next) => {
	try{
		if(typeof req.headers.authorization !== "undefined") {
			let token = req.headers.authorization.split(" ")[1];
			//console.log(token)
	        jwt.verify(token, Config.secret, async(err, user) => {
	        	if(err)
					return UnauthorizedError(res)
				//const isUserExists = await IsExists(User,{_id: user.id, access_token: token})
				//Updating last seen column to detect idle time
				const isUserExists = await FindAndUpdate({
					model: User,
					where: {_id: user.id, access_token: token},
					update:{$set: {last_seen: Date.now()} }
				})
				if(!isUserExists)
					return UnauthorizedError(res)
				req.user_id = user.id
				req.mobile = user.mobile
				req.name = user.name
	        	next()
	        });
	    }
	    else
	    	return UnauthorizedError(res)
	}
	catch(err){
		HandleServerError(res, req, err)
	}

}




exports.VerifyToken = VerifyToken
exports.MigrateSchema = MigrateSchema