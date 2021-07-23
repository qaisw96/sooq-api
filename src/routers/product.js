'use strict';

const express = require('express');
const productRouter = express.Router();

// middleware 
const bearerAuth = require('../middlewares/bearer'); 

// Models
const productsModel = require('../models/products');

// Classes
const ModelCollection = require('../models/data-classes/data-collection');

// instances
const productInstance = new ModelCollection(productsModel);

// end points 
productRouter.get('/product', bearerAuth,  getAllProducts);
productRouter.get('/product/:id', getOneProduct);
productRouter.post('/product', addProduct);
productRouter.put('/product/:id', updateProduct);
productRouter.delete('/product/:id', deleteProduct);

// callback functions
async function getAllProducts(req, res) {
    let products = await productInstance.get();
    res.status(200).json(products);
}

async function getOneProduct(req, res) {
    const id = req.params.id;
    let product = await productInstance.get(id);
    res.status(200).json(product);
}

async function addProduct(req, res) {
    const newProduct = req.body;
    let product = await productInstance.create(newProduct);
    res.status(201).json(product);
}

async function updateProduct(req, res) {
    const newProduct = req.body;
    const id = req.params.id;
    let product = await productInstance.update(id, newProduct);
    res.status(200).json(product);
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    let product = await productInstance.deleted(id);
    res.status(202).json(product);
}

module.exports = productRouter;
