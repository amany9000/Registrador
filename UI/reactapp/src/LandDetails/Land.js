import React ,{Component} from 'react';

import {Form , FormControl,Button} from 'react-bootstrap';
import LandInfo from './LandInfo';
import {Link } from 'react-router-dom';
import './Land.css';
import Main from '../Main/Main'

class Land extends Component{

	constructor(){

		super();

		this.state={
			newId:'',
			loading:false,
			LandId:'adb4566as'
		}


	}

 		handleSub(){
 			this.setState({
 				LandId:this.state.newId,
 				loading:true
 			})
 		}

	render(){


		return(
			

			<div>

				 <Main/>
				 <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head">Land Queries Information Page</h2>
             	</div>

               <div className="Des">
			<Form inline>
				<h3 style={{ color: 'white' }}> Enter the Land Id</h3>
			<FormControl style={{ color: 'white' }} type ="text" onChange={event => this.setState({newId:event.target.value})}>
			</FormControl>
			{' '}
			<Button  style={{{alignItems:'center'},{justifyContent:'center'},{width:'30px'},{height:'50px'}}} onClick ={()=> this.handleSub()}>
			SUBMIT
			</ Button>
			{
				this.state.loading ?
				<div>
				<LandInfo />
				</div>
				:
				<div>  </div>

			}


			</Form>
			</div>
			</div>
			
          )
	}
}




export default Land;