import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
  socket.on('getTransaction', timestamp => cb(null, timestamp));
  socket.emit('sendTransaction','1000');
}
export { subscribeToTimer };
