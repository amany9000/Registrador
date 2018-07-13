import React ,{Component} from 'react';

import {Form , FormControl,Button} from 'react-bootstrap';
import UserInfo from './UserInfo';
import './User.css';
import {Link} from 'react-router-dom';



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
			    <div className="bot">
                <h3 className="lin"><Link to ='/'> < h3 style={{color:'white'}}><u>Home</u></h3></Link> </h3>
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