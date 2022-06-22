const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/client/index.html")
});
app.get('/bundle.js', function(req, res) {
  res.sendFile(__dirname + "/client/dist/bundle.js");
});
io.on('connection', (socket) => {
  socket.on("send mess", (data) => {
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: data.name,
      user: data.user
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


