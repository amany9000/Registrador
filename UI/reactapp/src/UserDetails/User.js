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
			PublicKey:'sdgf8543'
		
		}
	}

 		handleSub(){
 			this.setState({
 				PublicKey:this.state.newKey,
 				loading:true,
 				
 			})
 		}

	render(){
		return(
			<div>
				 <Main/>
			    <div className="bot" style={{
					background: '#2bbbad'
				}}>
             	<h2 className ="Hea" >User Queries Information Page</h2>
             	</div>
			    
               <div className ="Desi" >
               <h3 style={{ color: 'white' }} >Enter the Public key of the user</h3>

			<Form inline>
				
			<FormControl style={{ color: 'white' }} type ="text" onChange={event => this.setState({newKey:event.target.value})}>
			</FormControl>
			{' '}
			<Button onClick ={()=> this.handleSub()} style={{ 
				backgroundColor: '#5d6dfc'
			},{alignItems:'center'},{justifyContent:'center'},{width:'30px'},{height:'50px'}}>
			SUBMIT
			</ Button> 
			{
				this.state.loading ?
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