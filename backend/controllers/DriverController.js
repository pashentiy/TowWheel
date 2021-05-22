const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('../config.js');
const fs = require('fs');
const { User, ProfilePicture, Driver, Vehicle, Ride, Garage, Mongoose } = require('../models')

const {
	IsExists, IsExistsOne, Insert, Find, FindOne, CompressImageAndUpload, FindAndUpdate, Delete,
	HandleSuccess, HandleError, HandleServerError,
	ValidateEmail, PasswordStrength, ValidateAlphanumeric, ValidateLength, ValidateMobile, isDataURL, GeneratePassword, Aggregate
} = require('./BaseController');

module.exports = {
	
	getNearestRideRequest: async (req, res, next) => {
		try {
			let { latitude, longitude } = req.query
            const user_id = req.user_id
            const driver_data = await FindOne({
                model: User,
                where: { _id: user_id},
                select: { driver_details: 1 }
            })
			if(!driver_data)
				return HandleError(res, 'Driver not found.')
			const driver_id = driver_data.driver_details
            
			const driver_vehicles_data = await Find({
                model: Driver,
                where: { _id: driver_id},
                select: { vehicles: 1 },
				populate: 'vehicles'
            })
			if(!driver_vehicles_data)
				return HandleError(res, 'Driver details not found.')
			const driver_owned_vehicles = driver_vehicles_data[0].vehicles.map(item=>item.type)

			const data = await Find({
				model: Ride,
				where: {
					source: {
						$near: {
							$geometry: {
								type: "Point",
								coordinates: [longitude,latitude]
							},
							$maxDistance: Config.max_map_range,
						}
					},
					ride_status: 'searching',
					required_vehicle_type: { $in: driver_owned_vehicles }
				}
			})

			if (!data)
				return HandleError(res, 'Failed to fetch data.')

			return HandleSuccess(res, data)

		} catch (err) {
			HandleServerError(res, req, err)
		}
	}
}