import React, { Component } from 'react';
import logo from './land.jpg';
import './App.css';
import Trans from './trans.js';

class App extends Component {

 constructor(){
      super();

      this.state={
        count :false
      }

    }

    changeCount(){
      this.setState({
        count : true
      })
    }

  render() {

   
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Registrador</h1>
        </header>
        <p className="App-intro">
         <i> Blockchain based land registry application</i>
        </p>
        
        <button onClick={()=> this.changeCount()}>
         List of  land transactions
        </button>
         {this.state.count ?
         <div className="Table">
        <Trans />
        </div>
        :
        <div></div>
      }
      </div>
    )
  }
}

export default App;
