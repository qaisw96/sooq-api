'use strict';

require('dotenv').config()

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {SECRET} = process.env;

const usersSchema = mongoose.Schema({
    username: {type: String, require: true, unique: true },
    password: {type: String, require: true},
    role: { type: String, required: true, default: 'buyer', enum: ['buyer', 'seller'] },
    avatar: {type: String},
    date: {type: Date, default: Date.now},
    savedProducts: {type: Array},
    theirProducts: {type: Array}
})

// virtual generated token 
usersSchema.virtual('token').get(function () {
    let tokenObj = {
        userName: this.username
    }

    return jwt.sign(tokenObj, SECRET )
})

// pre save hashed password
usersSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
      }
})

// basic auth
usersSchema.statics.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ username })
    const valid = await bcrypt.compare(password, user.password)
    if (valid) { return user; }
    throw new Error('Invalid User');
}
  



const usersModel = mongoose.model('user', usersSchema)
module.exports = usersModel