const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
const app = express();
const { generateMessage, generateLocationMessage } = require('./utils/message');
/**
 * configure socketIO
 */
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    //send to client (this particular socket that just connected)
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //send to all other connected clients (all other connected sockets)
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, cb) => {
        console.log('createMessage', message);

        // send to all connected clients (all sockets)
        io.emit('newMessage', generateMessage(message.from, message.text));

        //trigger acknowledgement without arguments
        cb();
        
        //trigger acknowledgement with argument
        // cb("error oo");

        //send back to client (this particular socket)
        // socket.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        //send to all clients except sender (this socket)
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        //send user cordinates to `all connected clients`
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log(`server is up on port ${port}`);
});