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
import BlockDetails from './BlockDetails/BlockDetails';
import SPVCreateTransaction from './SPV/SPVCreateTransaction';
import SPVHandleTransaction from './SPV/SPVHandleTransaction';
import LandIdCreate from './LandIdCreate/LandIdCreate';


 ReactDOM.render(
	<BrowserRouter>
 		<Switch>
        <Route  exact path='/' component ={Home}/>
        <Route  exact path='/App' component ={App}/>
        <Route path ='/LandDet' component ={Land} />
        <Route  path ='/UserDet' component={User}/>
        <Route path ='/Blockchain' component={Blockchain}/>
        <Route path ='/TransactionList' component ={TransactionList} />
        <Route path ='/TransactionDetails' component ={TransactionDetails} />
        <Route path ='/BlockDetails' component ={BlockDetails} />
        <Route path ='/SPVHandleTransaction' component ={SPVHandleTransaction} />
        <Route path ='/SPVCreateTransaction' component ={SPVCreateTransaction} />
        <Route path ='/LandIdCreate' component ={LandIdCreate} />
 		</Switch>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
