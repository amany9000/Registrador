import React, { Component } from 'react';
import './LandIdCreate.css';
import Main from '../Main/Main'
import { Table,Input,Button,Form } from 'semantic-ui-react'; 
import {landfunc} from '../Server/Landfunctions/landfun.js';

class Printlandid extends Component{



	render(){

		return(


			<div className ="landid" align="center">
			<h3 style={{background: '#2bbbad'}}> Congratulations  Landid generated is  : <u>asynskfsgm1233</u> </h3>
			</div>


			)

	}
}


export default Printlandid;