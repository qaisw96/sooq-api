'use strict';

const User = require('../models/user');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {  next('Invalid Login')};
    
    try {
        const token = req.headers.authorization.split(' ').pop();
        const validUser = await User.authenticateWithToken(token);
        
        req.user = validUser;
        req.token = validUser.token
        next()
    } catch(e) {
        next(e)
    }

}