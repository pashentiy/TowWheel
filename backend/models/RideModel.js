const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RideSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	assigned_driver: { type: Schema.Types.ObjectId, ref: 'drivers' },
	assigned_vehicle: { type: Schema.Types.ObjectId, ref: 'vehicles' },
	available_drivers: [{ type: Schema.Types.ObjectId, ref: 'drivers'}],
	required_vehicle_type: { type: String, required: true, trim: true, enum: ['BIKE', 'TRUCK', 'PRIVATE'] },
	source: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		},
		address: { type: String, required: true, trim: true }
	},
	destination: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		},
		address: { type: String, required: true, trim: true }
	},
	distance: { type: Number, required: true },
	time: { type: Number, required: true },
	ride_status: { type: String, required: true, trim: true, enum: ['searching', 'accepted', 'started', 'completed', 'cancelled'] },
	payment_details: {
		cost: { type: Number, required: true, default: 0 },
		is_paid: { type: Boolean, required: true, default: false },
		payment_mode: { type: String, required: true, default: 'cash', trim: true, enum: ['cash', 'payment_gateway'] }
	}
}, { timestamps: true })

RideSchema.index({ source: '2dsphere', destination: '2dsphere' });

const RideModel = mongoose.model('rides', RideSchema)
module.exports = RideModel