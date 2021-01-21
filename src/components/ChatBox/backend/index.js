const express = require('express');
const app = express();
const port = 5000;
var server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    // origin: 'http://18.224.228.145:80',
    origin: '127.0.0.1:3000',
    credentials: true,
    allowedHeaders: ['chatRooms'],
  },
});

io.on('connection', (socket) => {
  socket.on('disconnect', (reason) => {
    console.log('');
  });

  socket.on('join room', (data) => {
    console.log('a user connected');
    socket.join(data.room);
  });

  socket.on('leave room', (data) => {
    console.log('a user disconnected');
    socket.leave(data.room);
  });

  socket.on('new message', (data) => {
    socket.broadcast
      .to(data.room)
      .emit('receive message', [data.messageObj, data.room]);
  });
});

server.listen(port);
