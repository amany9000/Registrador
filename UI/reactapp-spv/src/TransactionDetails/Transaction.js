import React ,{Component} from 'react';

import {Button} from 'react-bootstrap';
import TransactionInfo from './TransactionInfo';
import {Link } from 'react-router-dom';
import './Transaction.css';
import Main from '../Main/Main';
import PropTypes from 'prop-types';
import { LandFormErrors } from './LandFormErrors';

let transactions = require("../transList.json")

class Transaction extends Component{

	constructor(props){

		super(props);

		this.state={
			LandId:'',
			loading:false,
			formErrors: {LandId:''},
			idValid:false,
			formValid:false,
			transactions:[]
		}
	}



	handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

 	handleSub(){
 		let tempList = [];
 		transactions.map((trans) => {
 			if(trans.data.landID === this.state.LandId){
 				this.state.transactions.push(trans);
 			}	
 		});
 		this.setState({loading:true});
 	}

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

  //handleSub(){
  //  	this.setState({loading:true});
//
//			
  //}

	render(){


		return(
			

			<div>

				 <Main/>
				 <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head">Transaction Queries</h2>
             	</div>

               <div className="Des">
			<form className="demo" >
				<h3 className="lab" style={{ color: 'white'}}><u> Enter the LandID of the Transaction</u></h3>
				
			   
			   <div className ={`form-group ${this.errorClass(this.state.formErrors.LandId)}`}>
			   
                <input style={{marginLeft:'170px',marginBottom:'20px'}}type="LandId" required className="form-control inp" name="LandId"
                placeholder="Enter"
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
				{this.state.transactions.map((trans)=> {
					return(<TransactionInfo trans = {trans}/>)
				})}
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

Transaction.propTypes ={
	LandId:PropTypes.string.isRequired
};


export default Transaction;