const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema=new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    rating: { type: Number, default: 1, min: 1, max: 5, required: true },
    review: { type: String, trim: true },
    ride: { type: Schema.Types.ObjectId, ref: 'rides' },
},{ timestamps: true })

const ReviewModel = mongoose.model('reviews', ReviewSchema)
module.exports = ReviewModel