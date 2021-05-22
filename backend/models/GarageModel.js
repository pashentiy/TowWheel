const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GarageSchema = new Schema({
    name: { type: String, trim: true, required: true},
	address: { type: String, trim: true, required: true},
    mobile: { type: String, required: true, trim: true },
    image: { type: String, trim: true, required: true},
    location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
    rating:[
        { type: Number, default: 1, min: 1, max: 5, required: true }
    ]
},{ timestamps: true })

GarageSchema.index({ location: '2dsphere' });

const GarageModel = mongoose.model('garages', GarageSchema)
module.exports = GarageModel