import React ,{Component} from 'react';

import {Form , FormControl,Button} from 'react-bootstrap';
import UserInfo from './UserInfo';
import './User.css';
import {Link} from 'react-router-dom';
import Main from '../Main/Main'

class User extends Component{

	

	constructor(){

		super();

		this.state={
			newKey:'',
			loading:false,
			PublicKey:'sdgf8543',
			

		}


	}

 		handleSub(){
 			this.setState({
 				PublicKey:this.state.newKey,
 				loading:true
 				
 			})
 		}

	render(){


		return(
			

			    <div>
				 <Main/>
			    <div className="bot">
             	<h2 className ="Hea" >User queries information page</h2>
             	</div>
			    
               <div className ="Desi" >
               <h3>Enter the Public key of the user</h3>

			<Form inline>
				
			<FormControl type ="text" onChange={event => this.setState({newKey:event.target.value})}>
			</FormControl>
			{' '}
			<Button onClick ={()=> this.handleSub()}>
			submit
			</ Button> 
			{
				this.state.loading  ?
				<div>
				<UserInfo />
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




export default User;