var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createMessage', { from: 'index.js@example.com', text: 'from index.js' }, function (error) {
    //     if (error) {
    //         console.log('something went wrong');
    //     } else {
    //         console.log('all good');
    //     }
    // })

});

socket.on('disconnect', function () {
    console.log('Dsiconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('new Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        //do something after ackowledgement
    });
});