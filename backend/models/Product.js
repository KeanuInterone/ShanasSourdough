const mongoose = require('mongoose')

const Product = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    imageURL: {
        type: String
    }
})

module.exports = mongoose.model('Product', Product)