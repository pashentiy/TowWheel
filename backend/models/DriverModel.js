const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DriverSchema = new Schema({
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		},
		heading:{
			type: Number,
			require: true,
			default: 0
		}
	},
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'vehicles'}],
	active_vehicle : { type: Schema.Types.ObjectId, ref: 'vehicles', required: true },
	is_available: { type: Boolean, required: true },
	profile_picture: { type: String, required: true},
    reviews: [Schema.Types.ObjectId],
},{ timestamps: true })

DriverSchema.index({ location: '2dsphere' });

const DriverModel = mongoose.model('drivers', DriverSchema)
module.exports = DriverModel