// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
//const cache = require('./cache');

//var User = require('./models/user.model')
//var UserService = require('./services/user.service')
//var redis = require('./redis.config')

const dev = process.env.NODE_ENV !== 'production'
const envOptions = {}
if (dev) envOptions['path'] = path.resolve(process.cwd(), '.env.dev')
dotenv.config(envOptions);

const redis_host = `${process.env.IO_REDIS_HOST}`
const redis_port = process.env.IO_REDIS_PORT
console.log(redis_host)
io.adapter(redis({ host: redis_host, port: redis_port || 6379 }));

const utils = require('./utils');
const port = process.env.PORT || 3000;
const serverName = process.env.NAME || 'Unknown';
server.listen(port, function () {
  console.log('Server listening at port %d', port);
  console.log('Hello, I\'m %s, how can I help?', serverName);
});

// Routing
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Chatroom
var numUsers = 0;

//cache.set('test','Hello Redis!');

io.use((socket, next) => {
  const { userId, mac } = socket.handshake.query;
  if (utils.validSHA1([userId], mac)) {
    return next();
  }
  return next(new Error('authentication error'));
});

io.on('connection', function (socket) {
  socket.emit('my-name-is', serverName);
  var addedUser = false;


  const { userId } = socket.handshake.query;
  socket.join(userId);
  
  let rooms = Object.keys(socket.rooms);
  console.log(`connect userId:${userId} id:${socket.id} rooms:`, rooms);

  var clients = io.sockets.adapter.rooms[userId];
  console.log('connect-sockets:', clients.sockets);


  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    let rooms = Object.keys(socket.rooms);
    console.log(`new message id:${socket.id}, ${data} rooms:`, rooms);

    const { userId } = socket.handshake.query;
    var clients = io.sockets.adapter.rooms[userId];
    console.log('new message-sockets:', clients.sockets);

    //let v = cache.get('test');
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });

    socket.to(userId).emit('new message', {
      username: 'system',
      message: 'Hi All'
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    const { userId } = socket.handshake.query;
    let rooms = Object.keys(socket.rooms);
    console.log('disconnect-rooms-before:', rooms);

    console.log('disconnect:', userId, socket.id)
    //socket.leave(`${userId}`)

    rooms = Object.keys(socket.rooms);
    console.log('disconnect-rooms-after:', rooms);

    var clients = io.sockets.adapter.rooms[userId];
    if (clients)
      console.log('disconnect:', clients.sockets);

    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

  socket.on('break', function () {
    const { userId } = socket.handshake.query;
    console.log('break:', userId)
  });
});

app.post('/send', function (req, res) {
  const { inboxId, userId, actionTypeId, toUserId, message, url, numUnRead, numInbox, mac } = req.body
  if (!utils.validSHA1([inboxId, userId, actionTypeId, toUserId, message, url], mac)) {
    res.status(400).send({ message: 'Invalid Param!' })
    return
  }

  io.to(toUserId).emit('notification', { inboxId, actionTypeId, message, url, numUnRead, numInbox })

  res.send({ success: true })
})