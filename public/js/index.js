var socket = io();


socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Dsiconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('new Message', message);
    var li = jQuery('<li></li>');
    var formattedTime = moment(message.createdAt).format('hh:m:s a');
    li.text(`${message.from}: ${message.text}  sentAt: ${formattedTime}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('li></li>');
    var formattedTime =  moment(message.createdAt).format('hh:m:s a');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}  sentAt:${formattedTime}`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

var messageSelector = jQuery('[name=message]');
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: messageSelector.val()
    }, function () {
        //do something after acknowledgement, which is clear the input field
        messageSelector.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    //disable button
    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (postion) {
        console.log(postion);
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: postion.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.')
    });
});