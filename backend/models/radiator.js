const mongoose = require('mongoose')

const radiatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('Radiator', radiatorSchema)