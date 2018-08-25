import React ,{Component} from 'react';

import {Form , FormControl,Button} from 'react-bootstrap';
import LandInfo from './LandInfo';
import {Link } from 'react-router-dom';
import './Land.css';
import Main from '../Main/Main';
import PropTypes from 'prop-types';
import { LandFormErrors } from './LandFormErrors';

class Land extends Component{

	constructor(props){

		super(props);

		this.state={
			LandId:'',
			loading:false,
			formErrors: {LandId:''},
			idValid:false,
			formValid:false
		}


	}



	handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

 		//handleSub(){
 		//	this.setState({
 				//LandId:this.state.LandId,
 				//loading:true
 		//	})
 		//}

  validateField(fieldName, value){
  	let fieldValidationErrors = this.state.formErrors;
  	let idValid = this.state.idValid;

  	switch(fieldName){
  		case 'LandId':
  			idValid = typeof value == 'string' && value.length <=15 &&value.length>=0;
  			fieldValidationErrors.LandId =idValid ? '' : 'is Invalid';
  			break;

  		default:
  			break;

  	}

  	    this.setState({formErrors: fieldValidationErrors,
                     idValid:idValid,
                   
                  }, this.validateForm);


  }

  validateForm(){
  	this.setState({formValid:this.state.idValid});
  }

    errorClass(error) {
    return(error.length === 0 ? '' : 'There is some error');
  }

  handleSub(){
    	this.setState({loading:true});

			
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
			<form className="demo" >
				<h3 className="lab" style={{ color: 'white'}}><u> Enter the Land Id</u></h3>
				
			   
			   <div className ={`form-group ${this.errorClass(this.state.formErrors.LandId)}`}>
			   
                <input style={{marginLeft:'170px',marginBottom:'20px'}}type="LandId" required className="form-control inp" name="LandId"
                placeholder="LandId"
                 value={this.state.LandId}
               onChange={this.handleUserInput}  />
			     </div>
			<div align = "center">
			<Button style={{alignItems:'center'},{justifyContent:'center'},{width:'30px'},{height:'50px'}}className="btn btn-primary" disabled={!this.state.formValid} onClick ={()=> this.handleSub()}>
			SUBMIT
			</ Button>
			<div  align="center"style={{color:'white'}} className= "panel panel-default">
				<LandFormErrors formErrors={this.state.formErrors}/>
				</div>
			</div>

			{

				this.state.loading ?
				<div>
				<LandInfo />
				</div>
				:
				<div>  </div>
			}
			


			</form>
			</div>
			</div>
			
          )
	}
}

Land.propTypes ={
	LandId:PropTypes.string.isRequired
};


export default Land;