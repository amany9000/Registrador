import React, { Component } from 'react';
import './LandIdCreate.css';
import Main from '../Main/Main'
import { Table,Input,Button,Form } from 'semantic-ui-react'; 


class Landpoint extends Component{


	render(){

		return(
			
			<div className="in">

				<Table celled> 

				<Table.Body>   
                        <Table.Row> 
                            <Table.Cell>Point 5</Table.Cell> 
                            <Table.Cell><Input size='mini' placeholder='' /></Table.Cell> 
                            
                        </Table.Row> 

                          </Table.Body>
                </Table>


			</div>
			



			)

	}




}

export default Landpoint;



