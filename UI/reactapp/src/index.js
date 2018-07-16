import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Blockchain from './Blockchain/Blockchain.js';
import registerServiceWorker from './registerServiceWorker';
import Land from './LandDetails/Land.js'
import User from './UserDetails/User.js'
import TransactionList from './TransactionList/TransactionList.js'
import TransactionDetails from './TransactionDetails/TransactionDetails.js'
import Main from'./Main/Main.js';
import Home from'./Main/Home.js';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

 ReactDOM.render(
	<BrowserRouter>
 		<Switch>
        <Route  exact path='/' component ={Home}/>
        <Route path ='/LandDet' component ={Land} />
        <Route  path ='/UserDet' component={User}/>
        <Route path ='/Blockchain' component={Blockchain}/>
        <Route path ='/TransactionList' component ={TransactionList} />
        <Route path ='/TransactionDetails' component ={TransactionDetails} />
 		</Switch>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
