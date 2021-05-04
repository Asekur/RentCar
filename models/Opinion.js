const { Schema, model } = require('mongoose')
const schema = new Schema({
    lastId: {type: Number, required: true, unique: true},
    userName: { type: String, required: true },
    comment: { type: String, required: true }
})

module.exports = model('Opinion', schema)