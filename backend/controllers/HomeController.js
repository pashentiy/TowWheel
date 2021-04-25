const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RealtimeListener } = require('../services')
const Config = require('../config.js');
const fs = require('fs');
const { User, ProfilePicture, Driver, Vehicle, Ride, Mongoose } = require('../models')

const {
	IsExists, IsExistsOne, Insert, Find, FindOne, CompressImageAndUpload, FindAndUpdate, Delete,
	HandleSuccess, HandleError, HandleServerError,
	ValidateEmail, PasswordStrength, ValidateAlphanumeric, ValidateLength, ValidateMobile, isDataURL, GeneratePassword, Aggregate
} = require('./BaseController');

module.exports = {

	getNearestTows: async (req, res, next) => {
		try {
			let { latitude, longitude } = req.query
			const data = await Find({
				model: Driver,
				where: {
					location: {
						$near: {
							$geometry: {
								type: "Point",
								coordinates: [longitude, latitude]
							},
							$maxDistance: Config.max_map_range,
						}
					},
					is_available: true
				},
				populate: 'active_vehicle',
				select: { location: 1, active_vehicle: 1 }
			})
			if (!data)
				return HandleError(res, 'Failed to fetch data.')

			return HandleSuccess(res, data)

		} catch (err) {
			HandleServerError(res, req, err)
		}
	},
	createRideRequest: async (req, res, next) => {
		try {
			const { source_address, destination_address, source, destination, distance, time, tow_type } = req.body
			const user_id = req.user_id
			let inserted = await Insert({
				model: Ride,
				data: {
					source: {
						type: 'Point',
						coordinates: source,
						address: source_address
					},
					destination: {
						type: 'Point',
						coordinates: destination,
						address: destination_address
					},
					distance: distance,
					time: time,
					required_vehicle_type: tow_type,
					user: user_id,
					ride_status: 'searching'
				}
			})
			if (!inserted)
				return HandleError(res, 'Failed to create tow request. Please contact system admin.')
			
			/*
			 *	Trigger Realtime update event
			 */

			RealtimeListener.realtimeDbEvent.emit('new_booking_update',source)


			return HandleSuccess(res, inserted)

		} catch (err) {
			HandleServerError(res, req, err)
		}
	},

	getMyRideRequest: async (req, res, next) => {
		try {
			const user_id = req.user_id
			let ride_data = await Ride.find({ user: user_id, $or: [{ride_status: 'searching'},{ ride_status: 'accepted'},{ride_status: 'started'}] })
				.sort({ createdAt: -1 })
				.limit(1)
				.populate({
					path: 'available_drivers',
					select: '_id reviews profile_picture location active_vehicle',
					populate: {
						path: 'reviews',
						model: 'reviews'
					}
				})
				.lean()
				.exec()

			ride_data = ride_data.length > 0 ? ride_data[0] : null
			if (ride_data) {
				for (let i = 0; i < ride_data.available_drivers.length; i++) {
					let item = ride_data.available_drivers[i]
					const user_details = await Find({
						model: User,
						where: { driver_details: item.id },
						select: 'name mobile'
					})
					item.user_details = user_details[0]
					const vehicle_details = await Find({
						model: Vehicle,
						where: { _id: item.active_vehicle, is_approved: true }
					})
					item.vehicle_details = vehicle_details.length > 0 ? vehicle_details[0] : null
					ride_data.available_drivers[i] = item
				}
			}

			return HandleSuccess(res, ride_data)

		} catch (err) {
			HandleServerError(res, req, err)
		}
	},
}