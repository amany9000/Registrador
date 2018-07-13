import React, { Component } from 'react';

import './Main.css';
import {Link} from 'react-router-dom';
import { Header, Icon ,Card,Menu} from 'semantic-ui-react';




class Main extends Component {

  

 

  render() {

    return (
      <div>
     <div className="xy" align="center"  >
      <Header as='h2'>
      <Icon name='legal' color="white"  />
      <Header.Content className="xz">Registrador- A blockchain based land registry application</Header.Content>
     
       < /Header>
       </div>
         <div align="left"  className="Men"> 
       <Menu inverted pointing vertical  style={{ marginTop: '20px'}}>
        <Link to ='/'>
        <Menu.Item name='Home'  /></Link>
        <Link to ='/LandDet'>
        <Menu.Item name='Land Queries '/></Link>
        <Link to ='/UserDet'>
        <Menu.Item name='User Queries' /></Link>
        <Link to ='/Blockchain'>
        <Menu.Item name='BlockList' /></Link>
        <Link to ='/TransactionList'>
        <Menu.Item name='TransactionList' /></Link>
      </Menu>
      </div>
   
   </div>

    )
  }
}

export default Main;
