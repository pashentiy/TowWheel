const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('../config.js');
const fs = require('fs');
const { RealtimeListener } = require('../services')
const { User, Mongoose, PersonalChat, RoomChat, ProfilePicture } = require('../models')
const Controllers = require('../controllers')

const {
	 Find, FindAndUpdate
} = require('./BaseController');

module.exports = {

	PersonalChat: async (socket, io) => {
		
	},


	RoomChat: async (socket, io) => {
		
	},

	PictureComment: async (socket, io) => {
		
	}
}


