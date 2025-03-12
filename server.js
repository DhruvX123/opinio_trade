const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

require('./sockets/index')(io);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
