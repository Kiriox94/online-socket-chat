const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var connectedUsers = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  let userId = connectedUsers.length
  connectedUsers.push("Anonymous")
  io.emit("userlist", connectedUsers)

  socket.on("disconnect", () => {
    connectedUsers.splice(userId, 1);
    io.emit("userlist", connectedUsers)
  })

  socket.on('chat message', (msg, user) => {
    io.emit('chat message', msg, user);
  });

  socket.on('change username', (username) => {
    connectedUsers[userId] = username
    io.emit("userlist", connectedUsers)
  });
});

server.listen(80, () => {
  console.log('listening on *:80');
});