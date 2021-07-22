'use strict'

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: {type: String, require: true},
    image:  {type: String, require: true},
    category: {type: String, require: true},
    price: {type: Number},
    phone: {type: String, require: true},
    description: {type: String},
    quantity: {type: Number},
    owner: {type: String},
    date: {type: Date, default: Date.now}
})

module.exports = productsModel = mongoose.model('product', productsSchema)