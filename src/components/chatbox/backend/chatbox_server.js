const express = require('express');
const app = express();
const port = 5000;
var server = require('http').createServer(app);
// var io = require('socket.io')(server);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['chatRooms'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', (reason) => {
    console.log('user disconnected');
  });

  socket.on('join room', (data) => {
    console.log('room join');
    console.log(data);
    socket.join(data.room);
  });

  socket.on('leave room', (data) => {
    console.log('leaving room');
    console.log(data);
    socket.leave(data.room);
  });

  socket.on('new message', (data) => {
    console.log(data);
    console.log(data.room);
    console.log(data.message);
    socket.broadcast
      .to(data.room)
      .emit('receive message', [data.messageObj, data.room]);
  });
});

server.listen(port);
console.log('running on', port);

// io.on('connection', (socket) => {
//   const id = socket.handshake.query.id;
//   //socket for joining the chat
//   socket.join(id);

//   socket.on('send-message', ({ recipients, text }) => {
//     recipients.forEach((recipient) => {
//       const newRecipients = recipients.filter((r) => r !== recipient);
//       newRecipients.push(id);
//       socket.broadcast.to(recipient).emit('receive-message', {
//         recipients: newRecipients,
//         sender: id,
//         text,
//       });
//     });
//   });
// });
