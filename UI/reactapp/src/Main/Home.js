import React, { Component } from 'react';

import './Main.css';
import {Link} from 'react-router-dom';
import { Header, Icon ,Card,Menu} from 'semantic-ui-react';
import Main from './Main';

class Home extends Component {

  render() {

    return (
        <div id="back">
            <Main/>
            <div style={{
                height: '490px',
            }}>
                <h1 style={{
                    color: '#cefffa',
                    textAlign: 'center',
                    fontSize: 100,
                    marginTop: 60,
                    fontFamily: 'bold'
                }}>Registrador</h1>
                <h4 style={{
                    color: '#98cec9',
                    textAlign: 'center',
                    fontSize: 30,
                    marginTop: 20,
                    fontFamily: 'bold'
                }}>Your land matters !!</h4>
                <h4 style={{
                    color: '#98cec9',
                    textAlign: 'center',
                    fontSize: 60,
                    marginTop: 80,
                    fontFamily: 'bold'
                }}>Land registry blockchain solution</h4>
            </div>
        </div>
    )
  }
}

export default Home;
