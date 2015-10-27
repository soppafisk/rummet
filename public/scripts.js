$(document).ready(function() {
  var host = "ws://localhost:3000";
  var ws = new WebSocket(host);

  var feedbackDiv = $('#feedback');
  // ws.send('hej//klienten');
  var name;
  ws.onopen = function() {
    name = "jens";//prompt("vad heter du?");
  }

  ws.onmessage = function(event) {
    // console.log(event.data);
    var data = $.parseJSON(event.data);
    var name = data.name;
    feedbackDiv.prepend(data.name + ": " + data.message + "<br>");
  };

  $('#send-message').click(function() {
    if (ws.readyState != WebSocket.OPEN) throw new Error('Not connected');
    var message = $('#the-message').val();
    var package = {message: message, name: name};
    ws.send(JSON.stringify(package));
    $('#the-message').val("");
  });
});
