const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
const app = express();
/**
 * configure socketIO
 */
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey what is giong on ?',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // socket.emit('newMessage')
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log(`server is up on port ${port}`);
});