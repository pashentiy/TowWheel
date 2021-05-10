const Config = require('../config.js')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema=new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    message: { type: String, trim: true },
    seen: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now, required: true }
})

const ChatSchema=new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'users'}],
    chats: [MessageSchema]
},{ timestamps: true })

const ChatModel = mongoose.model('chats', ChatSchema)
module.exports = ChatModel