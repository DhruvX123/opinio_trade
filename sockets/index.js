module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected');
      
      socket.on('place-trade', (trade) => {
        io.emit('update-trade', trade);
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  };
  