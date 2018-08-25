import React, { Component } from 'react';
import './LandIdCreate.css';
import Main from '../Main/Main'
import { Table,Input,Button,Form } from 'semantic-ui-react'; 


class LandIdCreate extends Component {

  render() {

    const blockList=[1,2,3,4,5,6,7,8,9,10] 

    return (
        <div>
            <Main/>
        <div id="main">
            <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head"> Generate your new Unique Land Id</h2>
            </div>
        </div>
                <div className="inpu" style={{
                    opacity: '0.8',
                    marginRight: '10px',
                    marginLeft: '330px',
                    marginTop: '50px'
                }} >

                <Form>
                <div >
                <h3 style={{color:'white',marginBottom:'20px'}} ><u>Please provide the previous Land Id </u></h3>
                </div>
                 <Form.Group widths='equal'>
                 <Form.Input
                         fluid
                     id='form-subcomponent-shorthand-input-first-name'
        
                     placeholder='Previous Land Id'
                    />
                 </Form.Group>
                 </Form>
                <div className="in">

                <Table celled> 
                    <Table.Header> 
                        <Table.Row>
                        <Table.HeaderCell> Point No. </Table.HeaderCell> 
                        <Table.HeaderCell> Lat-Long Coordinates </Table.HeaderCell> 
                       
                        </Table.Row> 
                    </Table.Header> 
   
                    <Table.Body>   
                        <Table.Row> 
                            <Table.Cell>Point 1</Table.Cell> 
                            <Table.Cell><Input size='mini' placeholder='' /></Table.Cell> 
                            
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>Point 2</Table.Cell> 
                            <Table.Cell><Input size='mini' placeholder='' /></Table.Cell> 
                            
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>Point 3</Table.Cell> 
                            <Table.Cell><Input size='mini' placeholder='' /></Table.Cell> 
                           
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>Point 4</Table.Cell> 
                            <Table.Cell><Input size='mini' placeholder='' /></Table.Cell> 
                            
                        </Table.Row> 
                    </Table.Body>
                </Table>
                </div>
                <div className="buttons">
                    <Button>+ New Point</Button>
                    <Button>Generate Unique Land Id</Button>
                </div>
            </div>
            <div className="note"  align="center">
                <h3> Note :<u>The coordinates must be in clockwise direction starting from north</u> </h3>
            </div>
        </div>
    );
  }
}

export default LandIdCreate;
