const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema=new Schema({
    ride: { type: Schema.Types.ObjectId, ref: 'rides', required: true },
	cost: { type: Number, required: true },
	is_paid: { type: Boolean, required: true, default: false },
	payment_mode: { type: String, required: true, trim: true, enum: ['cash', 'payment_gateway'] }
},{ timestamps: true })


const RideSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'drivers', required: true },
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
	},
	distance: { type: Number, required: true },
	ride_status: { type: String, required: true, trim: true, enum: ['accepted', 'started', 'completed', 'cancelled'] },
    payment_details: [PaymentSchema]
},{ timestamps: true })

RideSchema.index({ location: '2dsphere' });

const RideModel = mongoose.model('rides', RideSchema)
module.exports = RideModel