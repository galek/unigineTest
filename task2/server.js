var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist'));
app.use('/nipplejs', express.static(__dirname + '/../node_modules/nipplejs/dist'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Joystick connected!');
  
  socket.on('joystick event', function(data){
    // for (var i = 0; i < data[0].length; i++) {
    //   data[0][i]=0;
    // }
    console.log("Stick 1: " + data[0]);
    console.log("Buttons 2: " + data[1]);
    console.log("Distance: " + data[2]);
  });
  socket.on('disconnect', function(){
    console.log('Joystick disconnected');
  });  
  //socket.disconnect();
});

http.listen(port=80, function(){
  console.log('listening on *:'+port);
}); 