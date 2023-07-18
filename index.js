const express = require('express');
const functions = require('firebase-functions');

const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(port, (err) => {
    if (err) throw Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});

exports.api = functions.https.onRequest(app);