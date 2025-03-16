const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
const socketIoMiddleware = require('./middlewares/socketIoMiddleware')(io);






// Create the middleware after initializing io


require('./sockets/index')(io);

app.use(socketIoMiddleware);
server.listen(3000, () => {

  console.log('Server running on port 3000');
});
