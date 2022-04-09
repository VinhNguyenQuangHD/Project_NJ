
$(function(){
    var socket = io.connect('http://localhost:8080');


    socket.on('send', function(data){
        console.log(data);
        $("#content").append("<p class='message'>" + data.username + ":" + data.message + "</p>")
    })

    $("#sendMessage").on('click', function(){
        var username = $('#username').val();
        var message = $('#message').val();

        if (username == '' || message == '') {
            alert('Please enter name and message!!');
        } else {
            socket.emit('send', {username: username, message: message});
            $('#message').val('');
        }
    })
})