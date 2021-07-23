'use strict';

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  name: {type: String, required: true},
  image:  {type: String, required: true},
  category: {type: String, required: true},
  price: {type: Number},
  phone: {type: String, required: true},
  description: {type: String},
  quantity: {type: Number},
  owner: {type: String},
  date: {type: Date, default: Date.now}
});

const productsModel = mongoose.model('product', productsSchema);
module.exports = productsModel;
