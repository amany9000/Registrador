import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Land from './LandDetails/Land.js';
import TransactionList from './TransactionList/TransactionList.js';
import TransactionDetails from './TransactionDetails/TransactionDetails.js';
import Main from'./Main/Main.js';
import Home from'./Main/Home.js';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import SPVCreateTransaction from './SPV/SPVCreateTransaction';
import LandIdCreate from './LandIdCreate/LandIdCreate';


 ReactDOM.render(
	<BrowserRouter>
 		<Switch>
        <Route  exact path='/' component ={Home}/>
        <Route  exact path='/App' component ={App}/>
        <Route path ='/LandDet' component ={Land} />
        <Route path ='/SPVCreateTransaction' component ={SPVCreateTransaction} />
        <Route path ='/LandIdCreate' component ={LandIdCreate} />
 		</Switch>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
