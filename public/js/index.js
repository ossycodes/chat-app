var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Dsiconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('new Message', message);
});

socket.on('joinedRoom', function (message) {
    console.log(message.message);
});