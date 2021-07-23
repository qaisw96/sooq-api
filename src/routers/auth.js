'use strict';

const express = require('express');
const authRouter = express.Router();

// models 
const User = require('../models/user');

// middleware
const basicAuth = require('../middlewares/basicAuth')

// end points 
authRouter.post('/signup', handleSignUp);
authRouter.post('/signin', basicAuth,  handleSignIn);

// callback functions 
async function handleSignUp(req, res) {
    try {
        const user = new User(req.body)
        const newUser = await user.save() 

        const output = {
            userName: newUser.username,
            password: newUser.password ,
            role: newUser.role,
            avatar: newUser.avatar ,
            date: newUser.date,
            savedProducts: newUser.savedProducts,
            theirProducts: newUser.theirProducts
        }

        res.status(201).json(output)

    } catch(e) {
        e && res.status(500).json({
            error: e
        })
    }
};

function handleSignIn(req, res) {
    try {
        const user = {
            user: {
              _id: req.user.id,
              username: req.user.username
            } ,
            token: req.user.token
            };
          res.status(201).json(user);

    } catch(e) {
        e && res.status(500).json({
            error: e
        })
    }
};

module.exports = authRouter;