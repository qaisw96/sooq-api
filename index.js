'use strict';

require('dotenv').config();

const server = require('./src/server')
const {PORT, MONGODB_URI} = process.env;

server.start(PORT, MONGODB_URI);


