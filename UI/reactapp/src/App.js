import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer } from './Api/Api';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class App extends Component {

  constructor(props) {
    super(props);
    socket.on('getTransaction', timestamp => this.setState({ timestamp }));
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp
    }));
  }

  state = {
    timestamp: 'no timestamp yet'
  };

  render() {
    return (
      <div className="App">
      <p className="App-intro" style={{ color:'white' }}>
      This is the timer value: {this.state.timestamp}
      </p>
      <button onClick={()=> { socket.emit('sendTransaction','huhu');}}>
        hello
      </button>
    </div>
    );
  }
}

export default App;
