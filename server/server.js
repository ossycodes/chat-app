const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const util = require('util');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
const app = express();
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const Users = require('./utils/users');

/**
 * configure socketIO
 */
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {

    //listen for join event, by adding user to the given room    
    socket.on('join', (params, cb) => {
        //validate params (name and room)
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return cb('name and room name are required');
        }

        //join/add socket to room
        socket.join(params.room);

        //ensure there is no user with this socket id already
        users.removeUser(socket.id);

        //add newly joined user/socket to users array list
        users.addUser(socket.id, params.name, params.room);

        // console.log(users.users);

        //inform client to update the people display area with names of users in this room
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));

        //send to client (this particular socket that just connected)
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        //send to all other connected clients (all other connected sockets) in this room
        socket.to(params.room).broadcast.emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        //leave a room
        // socket.leave(params.room);

        cb();
    });

    socket.on('createMessage', (message, cb) => {
        //find room  the user/socket belongs to
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            // send to all connected clients (all sockets) that belongs to that room
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text, message.createdAt));
        }

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
        //find room  the user/socket belongs to
        let user = users.getUser(socket.id);
        if (user) {
            //send user cordinates to `all connected clients` in that room
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {

        //remove user from list
        let user = users.removeUser(socket.id);
        if (user) {
            // leave room
            // socket.leave(user.room);
            //inform client to update the people display area with names of users in this room
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});