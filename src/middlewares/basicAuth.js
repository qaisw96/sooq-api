'use strict';

const base64 = require('base-64');
const User = require('../models/user');

module.exports = async (req, res, next) => {

    if (!req.headers.authorization) { next('headers authorization is Empty') }

    try {
        let basic = req.headers.authorization.split(' ').pop();
        let [username, password] = base64.decode(basic).split(':');

        req.user = await User.authenticateBasic(username, password); 
        next()

    } catch(e) {
        next(`error: ${e}`)
    }

};