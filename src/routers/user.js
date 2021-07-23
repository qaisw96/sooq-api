'use strict';

const express = require('express');
const userRouter = express.Router()

// Models
const userModel = require('../models/user');

// Classes
const ModelCollection = require('../models/data-classes/data-collection');

// instances
const userInstance = new ModelCollection(userModel);

// end points 
userRouter.get('/user', getAllUsers)
userRouter.get('/user/:id', getOneUser)
userRouter.post('/user', addUser)
userRouter.put('/user/:id', updateUser)
userRouter.delete('/user/:id', deleteUser)

// callback functions
async function getAllUsers(req, res) {
    let users = await userInstance.get();
    res.status(200).json(users);
}

async function getOneUser(req, res) {
    const id = req.params.id;
    let user = await userInstance.get(id);
    res.status(200).json(user);
}

async function addUser(req, res) {
    const newUser = req.body;
    let user = await userInstance.create(newUser);
    res.status(201).json(user);
}

async function updateUser(req, res) {
    const newUser = req.body;
    const id = req.params.id;
    let user = await userInstance.update(id, newUser);
    res.status(200).json(user);
}

async function deleteUser(req, res) {
    const id = req.params.id;
    let user = await userInstance.deleted(id);
    res.status(202).json(user);
}

module.exports = userRouter
