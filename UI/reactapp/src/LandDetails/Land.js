import React ,{Component} from 'react';

import {Form , FormControl,Button} from 'react-bootstrap';
import LandInfo from './LandInfo';
import LandImage from './Land.jpg';

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
                  
             	<h2 className ="Head" >Land queries information page</h2>
			    
               <div className="Design">
			<Form inline>
				<h4>Enter the Land Id</h4>
			<FormControl type ="text" onChange={event => this.setState({newId:event.target.value})}>
			</FormControl>
			{' '}
			<Button onClick ={()=> this.handleSub()}>
			submit
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