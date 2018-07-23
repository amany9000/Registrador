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
              fontSize: 20,
              
            }}>
            <Link to ='/' style={{
              color: '#2bbbad'
            }}>Registrador</Link>
            </div>
          </div>
            <Link to ='/LandDet'><a class="item"> Land Queries </a></Link>
            <Link to ='/UserDet'><a class="item"> User Queries </a></Link>
            <Link to ='/Blockchain'><a class="item"> Blockchain </a></Link>
            <Link to ='/TransactionList'><a class="item"> Transaction List </a></Link>
            <Link to ='/SPVHandleTransaction'><a class="item"> Handle Transaction </a></Link>
            <Link to ='/SPVCreateTransaction'><a class="item"> Create Transaction </a></Link>
            <Link to ='/LandIdCreate'><a class="item"> Generate LandID </a></Link>
          </div>
        </div>
   </div>

    )
  }
}

export default Main;
