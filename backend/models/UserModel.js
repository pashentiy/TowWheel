const Config = require('../config.js')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	mobile: { type: String, required: true, unique: true, trim: true },
	name: { type: String, required: true, trim: true },
	is_driver: { type: Boolean, required: true, default: false },
	active_session_refresh_token: { type: String, required: true },
	access_token: { type: String },
    driver_details: { type: Schema.Types.ObjectId, ref: 'drivers', default: null },
},{ timestamps: true })

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel