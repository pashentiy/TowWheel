const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Config = require('../config.js')
const { SendSms } = require('../services')
const { Otp, User, ProfilePicture } = require('../models')

const {
	IsExists, Insert,  FindAndUpdate, Delete,
	HandleSuccess, HandleError, HandleServerError,
	ValidateMobile, GeneratePassword
} = require('./BaseController');

module.exports = {

	Login: async (req, res, next) => {
		try {
			const { mobile = '', otp = '' } = req.body

			let validateError = null
			if (!ValidateMobile(mobile.trim()))
				validateError = 'Please enter a valid mobile number without ISD code i.e 990xxxxx05.'

			if (validateError)
				return HandleError(res, validateError)

			let expiry = new Date ();
			expiry.setMinutes ( expiry.getMinutes() - Config.otpExpiryLimit );

			if (otp) {
				//Validate OTP and Login
				let isOtpExists = await IsExists({
					model: Otp,
					where: { mobile: mobile, otp: otp, createdAt: { $gt: expiry } }
				})
				let isUserExists = await IsExists({
					model: User,
					where: { mobile: mobile }
				})
				if(!isOtpExists)
					return HandleError(res, 'Failed to verify OTP.')
				else if(isOtpExists && isUserExists){
					Delete({
						model:Otp,
						where: { mobile: mobile }
					})
					let user = {... isUserExists[0]}
					const active_session_refresh_token = GeneratePassword()
					const access_token = jwt.sign({ id: user._id, mobile: user.mobile, name: user.name }, Config.secret, {
						expiresIn: Config.tokenExpiryLimit // 86400 expires in 24 hours -- It should be 1 hour in production
					});
		
					let updated = await FindAndUpdate({
						model: User,
						where: {_id: user._id},
						update: { $set: {last_seen: Date.now(), online_status: true, access_token: access_token, active_session_refresh_token: active_session_refresh_token} }
					})
					let userData = {... updated._doc}

					if(!updated)
						return HandleError(res, 'Failed to generate access token.')
					
					userData.access_token = access_token
					userData.active_session_refresh_token = active_session_refresh_token
					userData.isUserExists = true
					return HandleSuccess(res, userData)
				}

				//If no user found
				return HandleSuccess(res, { isUserExists: false })
			}
			// Send OTP
			let isOtpExists = await IsExists({
				model: Otp,
				where: { mobile: mobile, createdAt: { $gt: expiry } },
			})
			if(isOtpExists)
				return HandleError(res, 'Too many OTP requests. Please try after sometime.')

			const otpValue = Math.floor(1000 + Math.random() * 9000);
			var smsStatus = null
			// if(Config.environment!=='DEV'){
			smsStatus = await SendSms(mobile,otpValue)
			if(!smsStatus)
				return HandleError(res, 'Failed to send OTP. Please contact system admin.')
			// }
			const inserted = await Insert({
				model: Otp,
				data: {otp: otpValue, mobile: mobile}
			})
			if(!inserted)
				return HandleError(res, 'Failed to send OTP.')
			return HandleSuccess(res, { otp: otpValue })


		} catch (err) {
			HandleServerError(res, req, err)
		}

	},

	Signup: async (req, res, next) => {
		
	},

	RefreshToken: async (req, res, next) => {
		
	},

	LoginByToken: async (req, res, next) => {
		
	},
	
}


