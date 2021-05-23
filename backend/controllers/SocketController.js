const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('../config.js');
const fs = require('fs');
const { RealtimeListener } = require('../services')
const { User, ProfilePicture, Driver, Vehicle, Ride, Chat, Garage, Mongoose } = require('../models')
const Controllers = require('../controllers')

const {
	IsExists, Insert, Find, CompressImageAndUpload, FindAndUpdate, Delete,
	HandleSuccess, HandleError, HandleServerError, Aggregate,
	ValidateEmail, PasswordStrength, ValidateAlphanumeric, ValidateLength, ValidateMobile, isDataURL, GeneratePassword, FindOne, UpdateMany
} = require('./BaseController');

var online_drivers = []
var ride_requests = []

module.exports = {

	DriverRideRequest: async (socket, io) => {
		try {
			let driver_id = null
			socket.on('initialize', async (data, callback) => {
				driver_id = data._id
				const location = data.location
				socket.join(driver_id);
				online_drivers.push(driver_id)

				const isDriverLocationUpdated = await FindAndUpdate({
					model: Driver,
					where: {
						_id: driver_id,
					},
					update: {
						$set: {
							'location.coordinates': [data.location.longitude, data.location.latitude]
						}
					}
				})

				const driver_vehicles_data = await Find({
					model: Driver,
					where: { _id: driver_id },
					select: { vehicles: 1 },
					populate: 'vehicles'
				})
				if (!driver_vehicles_data || !isDriverLocationUpdated)
					return

				const driver_owned_vehicles = driver_vehicles_data[0].vehicles.map(item => item.type)

				const nearest_ride_requests = await Find({
					model: Ride,
					where: {
						source: {
							$near: {
								$geometry: {
									type: "Point",
									coordinates: [location.longitude, location.latitude]
								},
								$maxDistance: Config.max_map_range,
							}
						},
						ride_status: 'searching',
						required_vehicle_type: { $in: driver_owned_vehicles }
					}
				})

				const active_ride = await Find({
					model: Ride,
					where: {
						assigned_driver: driver_id,
						$or: [{ ride_status: 'accepted' }, { ride_status: 'started' }, { ride_status: 'completed', 'payment_details.is_paid': false }]
					},
					sort: { createdAt: -1 },
					limit: 1,
					populate: 'user',
					populateField: 'name mobile'
				})

				callback({ nearest_ride_requests, vehicles_data: driver_vehicles_data[0].vehicles, active_ride: active_ride.length > 0 ? active_ride[0] : null });
			});

			socket.on('accept_tow_request', async (data, callback) => {
				const update = await FindAndUpdate({
					model: Ride,
					where: { _id: data.ride_id },
					update: { $push: { available_drivers: data.driver_id } }
				});
				if (update) {
					callback(true)

					/*
						   *	Trigger Realtime update event
						   */

					RealtimeListener.realtimeDbEvent.emit('new_driver_update', data.ride_id)
				}
			});

			socket.on('decline_tow_request', async (data, callback) => {
				const update = await FindAndUpdate({
					model: Ride,
					where: { _id: data.ride_id },
					update: { $pull: { available_drivers: data.driver_id } }
				});
				if (update) {
					callback(true)

					/*
					 *	Trigger Realtime update event
					 */

					RealtimeListener.realtimeDbEvent.emit('new_driver_update', data.ride_id)
				}
			});

			socket.on('disconnect', async function () {
				online_drivers = online_drivers.filter(item => item !== driver_id)
			});


		} catch (err) {
			console.log(err)
		}
	},


	UserRideRequest: async (socket, io) => {
		try {
			let ride_id = null
			socket.on('initialize', async (data, callback) => {
				ride_id = data.ride_id
				socket.join(ride_id);
				ride_requests.push(ride_id)

				let ride_data = await Ride.find({ _id: ride_id })
					.populate({
						path: 'available_drivers',
						select: '_id reviews profile_picture location active_vehicle',
						match: { is_available: true },
						populate: {
							path: 'reviews',
							model: 'reviews'
						}
					})
					.lean()
					.exec()

				ride_data = ride_data.length > 0 ? ride_data[0] : null
				if (ride_data) {
					var available_drivers = []
					for (let i = 0; i < ride_data.available_drivers.length; i++) {
						let item = ride_data.available_drivers[i]
						const is_driver_available = await FindOne({
							model: Driver,
							where: { _id: item._id, is_available: true },
						})
						if(!is_driver_available)
							continue

						const user_details = await Find({
							model: User,
							where: { driver_details: item._id },
							select: 'name mobile'
						})
						item.user_details = user_details[0]
						const vehicle_details = await Find({
							model: Vehicle,
							where: { _id: item.active_vehicle, is_approved: true }
						})
						item.vehicle_details = vehicle_details.length > 0 ? vehicle_details[0] : null
						available_drivers.push(item)
					}
					ride_data.available_drivers = available_drivers

					callback(ride_data)
				}
			});

			socket.on('cancel_ride_request', async (data, callback) => {

				// TO DO : Add code for realtime deleted status update in driver's socket

				const rideLocation = await FindOne({
					model: Ride,
					where: { _id: data.ride_id },
					select: {
						'source.coordinates': 1
					}
				})

				const deleted = await Delete({
					model: Ride,
					where: { _id: data.ride_id },
				})
				if (!rideLocation || !deleted)
					return

				callback(true)

				/*
				 *	Trigger Realtime update event
				 */

				RealtimeListener.realtimeDbEvent.emit('new_booking_update', rideLocation.source.coordinates)

			});

			socket.on('hire_driver', async (data, callback) => {

				const isDriverAvailable = await FindOne({
					model: Driver,
					where: { _id: data.driver_id, is_available: true, active_vehicle: data.active_vehicle }
				})

				if (isDriverAvailable) {
					const isUpdated = await FindAndUpdate({
						model: Ride,
						where: { _id: data.ride_id, ride_status: 'searching' },
						update: {
							$set: { ride_status: 'accepted', assigned_driver: data.driver_id, assigned_vehicle: data.active_vehicle, available_drivers: [], 'payment_details.cost': data.cost }
						}
					})
					const driverChangeAvailability = await FindAndUpdate({
						model: Driver,
						where: { _id: data.driver_id, is_available: true, active_vehicle: data.active_vehicle },
						update: {
							$set: { is_available: false }
						}
					})

					if (isUpdated && driverChangeAvailability){
						callback(isUpdated)

						const driver_other_rides = await Find({
							model: Ride,
							where: {
								available_drivers: {"$in": [data.driver_id]}
							},
						})

						/*
						 *	Trigger Realtime update event
						 */

						RealtimeListener.realtimeDbEvent.emit('hire_driver_update', data.driver_id)
						RealtimeListener.realtimeDbEvent.emit('new_booking_update', isUpdated.source.coordinates)
						driver_other_rides.forEach(item=>{
							RealtimeListener.realtimeDbEvent.emit('new_driver_update', item._id)
						})
					}
				}

				return callback(false)
			});

			socket.on('disconnect', async function () {
				ride_requests = ride_requests.filter(item => item !== ride_id)
			});


		} catch (err) {
			console.log(err)
		}
	},

	UserDriverInprogress: async (socket, io) => {
		try {
			let ride_id = null
			socket.on('initialize_user', async (data, callback) => {
				ride_id = data.ride_id
				socket.join(ride_id);
				let ride_data = await Ride.findOne({ _id: ride_id })
					.populate({
						path: 'assigned_driver',
						populate: {
							path: 'reviews',
							model: 'reviews'
						}
					})
					.populate({
						path: 'assigned_vehicle',
					})
					.lean()
					.exec()
				if (ride_data) {
					const driver_details = await FindOne({
						model: User,
						where: { driver_details: ride_data.assigned_driver._id },
						select: '_id name mobile'
					})
					ride_data.driver_details = driver_details

					const unread_chat_count = await Aggregate({
						model: Chat,
						data: [
							{
								$match: {
									$and: [
										{ members: ride_data.user },
										{ members: driver_details._id }
									],
									chats: { $elemMatch: { seen : false, sender: driver_details._id } }
								}
							},
							{ $unwind : "$chats" },
							{ $match: { "chats.seen" : false, "chats.sender": driver_details._id } },
							{ $group : { _id : "$_id", chats : { $addToSet : "$chats" } }}
						]
					})
					ride_data.unread_chat_count = unread_chat_count[0]?unread_chat_count[0].chats.length:0
					callback(ride_data)
				}
			});

			socket.on('initialize_driver', async (data, callback) => {
				ride_id = data.ride_id
				socket.join(ride_id);
				const ride_data = await Find({
					model: Ride,
					where: {
						_id: ride_id
					},
					populate: 'user',
					populateField: 'name mobile'
				})
				if (ride_data.length > 0) {
					const driver_details = await FindOne({
						model: User,
						where: { driver_details: ride_data[0].assigned_driver },
						select: '_id name mobile'
					})
					const unread_chat_count = await Aggregate({
						model: Chat,
						data: [
							{
								$match: {
									$and: [
										{ members: ride_data[0].user._id },
										{ members: driver_details._id }
									],
									chats: { $elemMatch: { seen : false, sender: ride_data[0].user._id } }
								}
							},
							{ $unwind : "$chats" },
							{ $match: { "chats.seen" : false, "chats.sender": ride_data[0].user._id } },
							{ $group : { _id : "$_id", chats : { $addToSet : "$chats" } }}
						]
					})

					ride_data[0].unread_chat_count = unread_chat_count[0]?unread_chat_count[0].chats.length:0
					callback(ride_data[0])
				}
			});

			socket.on('update_driver_location', async (data) => {
				const isDriverLocationUpdated = await FindAndUpdate({
					model: Driver,
					where: {
						_id: data.driver_id,
					},
					update: {
						$set: {
							'location.coordinates': [data.location.longitude, data.location.latitude],
							'location.heading': data.location.heading
						}
					}
				})

				if (isDriverLocationUpdated && ride_id)
					socket.to(ride_id).emit('driver_location_changed', data.location)
			});

			socket.on('cancel_ride_request', async (data, callback) => {

				// TO DO : Add code for realtime deleted status update in driver's socket

				const driverChangeAvailability = await FindAndUpdate({
					model: Driver,
					where: { _id: data.driver_id },
					update: {
						$set: { is_available: true }
					}
				})

				const deleted = await Delete({
					model: Ride,
					where: { _id: data.ride_id },
				})
				if (!deleted)
					return

				callback(true)
				io.of('/driver-ride-request').to(data.driver_id + '').emit('new_booking_update', true)
				socket.to(ride_id).emit('cancel_ride_request', true)
				
				const driver_other_rides = await Find({
					model: Ride,
					where: {
						available_drivers: {"$in": [data.driver_id]}
					},
				})
				driver_other_rides.forEach(item=>{
					RealtimeListener.realtimeDbEvent.emit('new_driver_update', item._id)
				})
				
			});

			socket.on('start_tow_ride', async (data, callback) => {
				const rideStarted = await FindAndUpdate({
					model: Ride,
					where: {
						_id: data.ride_id,
					},
					update: {
						$set: {
							ride_status: 'started'
						}
					}
				})
				if (rideStarted) {
					callback(true)
					socket.to(ride_id).emit('start_tow_ride', true)
				}
			});

			socket.on('complete_ride', async (data, callback) => {
				const rideCompleted = await FindAndUpdate({
					model: Ride,
					where: {
						_id: data.ride_id,
					},
					update: {
						$set: {
							ride_status: 'completed',
							'payment_details.is_paid': true,
						}
					}
				})
				if (rideCompleted) {
					const driverChangeAvailability = await FindAndUpdate({
						model: Driver,
						where: { _id: rideCompleted.assigned_driver },
						update: {
							$set: { is_available: true }
						}
					})
					callback(true)
					socket.to(ride_id).emit('complete_ride', true)
				}
			});

			socket.on('change_destination', async (data, callback) => {
				const updated = await FindAndUpdate({
					model: Ride,
					where: {
						_id: ride_id,
					},
					update: {
						$set: {
							'destination.coordinates': [data.longitude,data.latitude],
							'destination.address': data.address
						}
					}
				})
				if (updated) {
					callback(true)
					socket.to(ride_id).emit('change_destination', data)
				}
			});

			socket.on('disconnect', async function () {

			});


		} catch (err) {
			console.log(err)
		}
	},

	LiveChat: async (socket, io) => {
		try {
			let chat_id = null
			let user_id = null
			let partner_id = null
			let ride_id = null
			socket.on('initialize_chat', async (data, callback) => {
				user_id = data.user_id
				partner_id = data.partner_id
				ride_id = data.ride_id
				let chats = await FindOne({
					model: Chat,
					where: {
						$and: [
							{ members: user_id },
							{ members: partner_id }
						]
					}
				})

				if (chats) {
					chat_id = chats._id + ''
					socket.join(chat_id)
					chats = await Chat.findOneAndUpdate(
						{ _id: chat_id, 'chats.receiver': user_id },
						{
							$set: { 'chats.$[chat].seen': true }
						},
						{
							arrayFilters: [
								{ "chat.receiver": user_id },
							],
							new: true
						}
					).exec()
					socket.broadcast.to(chat_id).emit('bulk_seen', chats.chats)
					callback(chats.chats)
				}
				else {
					const inserted = await Insert({
						model: Chat,
						data: {
							members: [user_id, partner_id]
						}
					})
					chat_id = inserted._id + ''
					socket.join(chat_id)
					callback([])
				}
			})

			socket.on('new_message', async (message, callback) => {
				let data = {
					sender: user_id,
					receiver: partner_id,
					message: message
				}
				//if(io.of("/live-chat").adapter.rooms.get(chat_id).size > 1)

				if (chat_id) {
					const chats = await FindAndUpdate({
						model: Chat,
						where: { _id: chat_id },
						update: {
							$push: {
								chats: {
									$each: [data],
									$slice: -50
								}
							}
						}
					})

					const inserted = chats.chats.slice(-1)[0]
					callback(inserted)

					if (io.of("/live-chat").adapter.rooms.get(chat_id).size > 1)
						socket.broadcast.to(chat_id).emit('new_message', inserted)
					else {
						//push alert
						io.of('/user-driver-inprogress').to(ride_id + '').emit('new_message', inserted)
					}

				}
			})

			socket.on('message_seen', async (message_id) => {

				const seen = await FindAndUpdate({
					model: Chat,
					where: { _id: chat_id, 'chats._id': message_id },
					update: {
						$set: { 'chats.$.seen': true }
					}
				})

				socket.broadcast.to(chat_id).emit('message_seen', message_id)

			})

			socket.on('disconnect', async function () {
				socket.leave(chat_id)
			});


		} catch (err) {
			console.log(err)
		}
	},


	/*
	 *	Realtime Data updates
	 */


	RealtimeDatabaseUpdates: async (socket, io) => {
		try {

			socket.on('new_driver_update', async ride_id => {

				if (ride_requests.filter(d => d == ride_id).length > 0)
					io.of('/user-ride-request').to(ride_id + '').emit('new_driver_update', true)

			});

			socket.on('hire_driver_update', async driver_id => {

				if (online_drivers.filter(d => d == driver_id).length > 0)
					io.of('/driver-ride-request').to(driver_id + '').emit('new_booking_update', true)

			});

			socket.on('new_booking_update', async location => {
				const nearest_drivers = await Find({
					model: Driver,
					where: {
						location: {
							$near: {
								$geometry: {
									type: "Point",
									coordinates: [location[0], location[1]]
								},
								$maxDistance: Config.max_map_range,
							}
						}
					},
					select: {
						_id: 1
					}
				})

				nearest_drivers.map(driver => {
					if (online_drivers.filter(d => d == driver._id).length > 0)
						io.of('/driver-ride-request').to(driver._id + '').emit('new_booking_update', true)
				})

			});

			socket.on('disconnect', async function () {

			});


		} catch (err) {
			console.log(err)
		}
	},



}


