const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('../config.js');
const fs = require('fs');
const { RealtimeListener } = require('../services')
const { User, ProfilePicture, Driver, Vehicle, Ride, Mongoose } = require('../models')
const Controllers = require('../controllers')

const {
	IsExists, Insert, Find, CompressImageAndUpload, FindAndUpdate, Delete,
	HandleSuccess, HandleError, HandleServerError, Aggregate,
	ValidateEmail, PasswordStrength, ValidateAlphanumeric, ValidateLength, ValidateMobile, isDataURL, GeneratePassword, FindOne
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

				callback({ nearest_ride_requests, active_ride: active_ride.length > 0 ? active_ride[0] : null });
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
					for (let i = 0; i < ride_data.available_drivers.length; i++) {
						let item = ride_data.available_drivers[i]
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
						ride_data.available_drivers[i] = item
					}

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
						where: { _id: ride_id, ride_status: 'searching' },
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
						
						/*
				   		 *	Trigger Realtime update event
				   		 */

						RealtimeListener.realtimeDbEvent.emit('hire_driver_update', data.driver_id)
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
					const user_details = await FindOne({
						model: User,
						where: { driver_details: ride_data.assigned_driver },
						select: 'name mobile'
					})
					ride_data.driver_details = user_details
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

				if (ride_data.length > 0)
					callback(ride_data[0])
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
				socket.to(ride_id).emit('cancel_ride_request')

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

			socket.on('disconnect', async function () {

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


	/*RoomChat: async (socket, io) => {
		try {
			let room_id = null
			let user = null

			socket.on('enter', async (room_name, user_details) => {
				room_id = room_name
				user = user_details
				socket.join(room_id);
				//User entry in database
				await FindAndUpdate({
					model: RoomChat,
					where: { _id: room_id },
					update: { $push: { online_users: user._id } }
				});
				let chatList = await RoomChat.find({ _id: room_id })
					.select({ chats: 1, online_users: 1 })
					.sort({ 'chats.createdAt': -1 })
					.populate({
						path: 'online_users',
						select: '_id name gender profile_picture_id',
						sort: { _id: -1 },
						populate: {
							path: 'profile_picture_id',
							model: 'profile_pictures',
							select: 'picture'
						}
					})
					.populate({
						path: 'chats.sender',
						select: '_id name profile_picture_id',
						populate: {
							path: 'profile_picture_id',
							model: 'profile_pictures',
							select: 'picture'
						}
					})
					.lean().exec()
				socket.emit('chat_history', chatList[0]);
				socket.broadcast.to(room_id).emit('new_user_entry', user);
			});

			socket.on('disconnect', async function () {
				//User exit in database
				await FindAndUpdate({
					model: RoomChat,
					where: { _id: room_id },
					update: { $pull: { online_users: user._id } }
				});
				socket.broadcast.to(room_id).emit('user_exit', user);
			});

			socket.on('send_message', async ({ content, type, _id }) => {
				let data = {
					sender: user._id,
					type: type,
					content: content
				}
				const where = { _id: room_id }
				const query = {
					$push: {
						chats: {
							$each: [data],
							$slice: Config.room_chat_count_limit * -1
						}
					}
				}

				let updated = await FindAndUpdate({
					model: RoomChat,
					where: where,
					update: query
				})
				if (updated) {
					socket.emit('message_delivered', { _id: updated.chats[updated.chats.length - 1]._id, message_temp_id: _id });

					data = {
						sender_id: user._id,
						sender_name: user.name,
						profile_picture: user.profile_picture,
						_id: updated.chats[updated.chats.length - 1]._id,
						type: updated.chats[updated.chats.length - 1].type,
						content: updated.chats[updated.chats.length - 1].content,
						createdAt: updated.chats[updated.chats.length - 1].createdAt
					}

					socket.broadcast.to(room_id).emit('new_message', data);
				}
			});

		} catch (err) {
			console.log(err)
		}
	},

	PictureComment: async (socket, io) => {
		try {
			socket.on('startcomment', async function (profile_picture_id) {
				const room_name = profile_picture_id;
				socket.join(room_name);
				let commentList = await Find({
					model: ProfilePicture,
					where: { _id: profile_picture_id },
					select: { comments: { $slice: [0, 50] } },
					sort: { 'comments.createdAt': -1 }
				});
				socket.emit('commenthistory', commentList[0].comments);
			});

			socket.on('send_comment', async ({ profile_picture_id, commenter_id, commenter_name, commenter_profile_picture, comment }) => {
				const room_name = profile_picture_id;
				let data = {
					commenter_id: commenter_id,
					commenter_name: commenter_name,
					commenter_profile_picture: commenter_profile_picture,
					comment: comment
				}
				// console.log(io.of("/picture-comment").adapter.rooms.get(room_name).size)
				const room_length = io.of("/picture-comment").adapter.rooms.get(room_name).size

				const where = { _id: profile_picture_id }
				const query = { $push: { comments: data } }

				let updated = await FindAndUpdate({
					model: ProfilePicture,
					where: where,
					update: query
				})
				if (updated) {
					if (room_length > 1)
						socket.broadcast.to(room_name).emit('comment', data);
					else {
						// notification
					}
				}
			});
		} catch (err) {
			console.log(err)
		}
	}*/
}


