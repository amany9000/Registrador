import React, { Component } from 'react';
import './LandIdCreate.css';
import Main from '../Main/Main'
import { Table } from 'semantic-ui-react'; 

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
                <div style={{
                    opacity: 0.8,
                    marginRight: 200,
                    marginLeft: 200,
                    marginTop: 50
                }}>
                <Table celled> 
                    <Table.Header> 
                        <Table.Row>
                        <Table.HeaderCell> Point No. </Table.HeaderCell> 
                        <Table.HeaderCell> X Coordinate </Table.HeaderCell> 
                        <Table.HeaderCell> Y Coordinate </Table.HeaderCell> 
                        </Table.Row> 
                    </Table.Header> 
   
                    <Table.Body>   
                        <Table.Row> 
                            <Table.Cell>Point 1</Table.Cell> 
                            <Table.Cell>78.7793</Table.Cell> 
                            <Table.Cell>17.4738992</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>Point 2</Table.Cell> 
                            <Table.Cell>78.9443</Table.Cell> 
                            <Table.Cell>17.22</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>Point 3</Table.Cell> 
                            <Table.Cell>78.9793</Table.Cell> 
                            <Table.Cell>17.47382</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>Point 4</Table.Cell> 
                            <Table.Cell>78.93</Table.Cell> 
                            <Table.Cell>17.4777</Table.Cell> 
                        </Table.Row> 
                    </Table.Body>
                </Table>
                <div className="buttons">
                    <button> + New Point  </button>
                    <button> Generate Unique Land Id  </button>
                </div>
            </div>
        </div>
    );
  }
}

export default LandIdCreate;
