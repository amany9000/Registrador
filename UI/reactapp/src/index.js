import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Blockchain from './Blockchain/Blockchain.js';
import registerServiceWorker from './registerServiceWorker';
import Land from './LandDetails/Land.js'
import User from './UserDetails/User.js'
import Transaction from './TransactionList/TransactionList.js'
import Main from'./Main/Main.js';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

 ReactDOM.render(
	<BrowserRouter>
 		<Switch>
        <Route  exact path='/' component ={Main}/>
        <Route path ='/LandDet' component ={Land} />
        <Route  path ='/UserDet' component={User}/>
        <Route path ='/Blockchain' component={Blockchain}/>
        <Route path ='/TransactionList' component ={Transaction} />
        
 		</Switch>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
