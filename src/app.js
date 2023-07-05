const express = require('express');

const app = express();
const chatManager = require('./manager/index.js');

app.use('/public', express.static(__dirname + '/public'));

app.get('/borraBaseDeDatos', (req, res) => {
    chatManager.deleteDatabase();
    res.json({ messages: chatManager.getMessages() });
});

app.use('*', (req, res) => {
    res.redirect('/public/index.html');
});

module.exports = app;
