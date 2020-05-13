var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
    socket.emit('createMessage', {
        from: 'julie@example.com',
        text: 'Yooo!'
    });

});

socket.on('disconnect', function () {
    console.log('Dsiconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('new Message', message);
});