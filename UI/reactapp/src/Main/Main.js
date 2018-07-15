import React, { Component } from 'react';

import './Main.css';
import {Link} from 'react-router-dom';
import { Header, Icon ,Card,Menu} from 'semantic-ui-react';




class Main extends Component {

  

 

  render() {

    return (
      <div>

      <div class="ui inverted segment">
        <div class="ui inverted secondary pointing menu">
          <div class="header item">
            <div style={{
              color: 'grey',
              fontSize: 20
            }}>
            Registrador
            </div>
          </div>
            <Link to ='/'><a class="item"> Home </a></Link>
            <Link to ='/LandDet'><a class="item"> Land Queries </a></Link>
            <Link to ='/UserDet'><a class="item"> User Queries </a></Link>
            <Link to ='/Blockchain'><a class="item"> Blockchain </a></Link>
            <Link to ='/TransactionList'><a class="item"> Transaction List </a></Link>
          </div>
        </div>
   </div>

    )
  }
}

export default Main;
