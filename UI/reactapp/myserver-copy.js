const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('sendTransaction', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('getTransaction', new Date());
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
