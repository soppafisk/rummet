var server = require('http').createServer();
var url = require('url');
var express = require('express');
var fs = require('fs');
var WebSocketService = require('ws').Server;
var wss = new WebSocketService({server: server});

var app = express();

app.use(express.static(__dirname + "/public"));

wss.on('connection', function(ws){
  ws.on('message', function(message) {
    //console.log('received: %s', message);
    wss.broadcast(message);
  });
  //ws.send('Välkommen!');
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data, function(error) {
      if(error)
        console.log(error);
    });
  });
};

server.on('request', app);
server.listen('3000', function () {
  console.log('Listening on ' + server.address().port);
});
