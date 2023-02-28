const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {

    console.log('a user connected');
    // listen for data and forward it to the other users
    socket.on('newData', (data) => {
        socket.broadcast.emit('newData', data);
    });
});

httpServer.listen(3001, () => {
    console.log('listening on *:3001');
});