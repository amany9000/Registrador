import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Land from './LandDetails/Land.js'
import Home from'./Main/Home.js';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import SPVCreateTransaction from './SPV/SPVCreateTransaction';
import LandIdCreate from './LandIdCreate/LandIdCreate';


 ReactDOM.render(
	<BrowserRouter>
 		<Switch>
        <Route  exact path='/' component ={Home}/>
        <Route path ='/LandDet' component ={Land} />
        <Route path ='/SPVCreateTransaction' component ={SPVCreateTransaction} />
        <Route path ='/LandIdCreate' component ={LandIdCreate} />
 		</Switch>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
