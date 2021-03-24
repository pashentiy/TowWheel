const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('../config.js');
const fs = require('fs');

const {
	Find, HandleSuccess, HandleError, HandleServerError
} = require('./BaseController');

module.exports = {

	getNewsfeeds: async (req, res, next) => {
		try {
			let sort = { createdAt: -1 }
			let limit = 10
			const myid = req.user_id
			const { page } = req.query || 1
			let skip = (page - 1) * limit
			let where = { _id: { $ne: Mongoose.Types.ObjectId(myid) } }
			let select = { name: 1, username: 1, bio: 1, city: 1, country: 1, dob: 1, gender: 1 }
			let data = await Find({
				model: User,
				where: where,
				select: select,
				sort: sort,
				limit: limit,
				skip: skip,
				populate: 'profile_picture_id',
				populateField: { _id: 1, likes: 1, picture: 1 }
			})
			if (!data)
				return HandleError(res, 'Failed to fetch data.')

			return HandleSuccess(res, data)

		} catch (err) {
			HandleServerError(res, req, err)
		}
	},
}