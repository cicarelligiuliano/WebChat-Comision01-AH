const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

const chatManager = require('./manager/index.js');

io.on('connection', (socket) => {
    let userName = '';

    socket.on('login', (username) => {
        userName = username;
        socket.broadcast.emit('newUser', username);
        socket.emit('chat', chatManager.getMessages());
    });

    socket.on('newMessage', (message) => {
        const newMessage = chatManager.addMessage(message);
        io.emit('addMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado con id', socket.id);
        socket.broadcast.emit('userLeave', userName);
    });
});

module.exports = server;
