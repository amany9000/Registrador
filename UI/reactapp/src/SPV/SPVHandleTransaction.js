import React, { Component } from 'react';
import './SPVHandleTransaction.css';
import Main from '../Main/Main'
import { Table } from 'semantic-ui-react'; 

class SPVHandleTransaction extends Component {

  render() {

    const blockList=[1,2,3,4,5,6,7,8,9,10] 

    return (
        <div>
            <Main/>
        <div id="main">
            <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head"> Handle Incoming Transaction</h2>
            </div>
        </div>
                <div style={{
                    opacity: 0.8,
                    marginRight: 50,
                    marginLeft: 50,
                    marginTop: 50
                }}>
                <Table celled> 
                    <Table.Header> 
                        <Table.Row> 
                        <Table.HeaderCell> Fields </Table.HeaderCell> 
                        <Table.HeaderCell> Data </Table.HeaderCell> 
                        </Table.Row> 
                    </Table.Header> 
   
                    <Table.Body>   
                        <Table.Row> 
                            <Table.Cell>class</Table.Cell> 
                            <Table.Cell>transaction</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>timestamp</Table.Cell> 
                            <Table.Cell>64922617</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>landID</Table.Cell> 
                            <Table.Cell>13abchndzz4545sss2x125wr2zaa4s6666erf6e6f1e61fdk4l444</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>from</Table.Cell> 
                            <Table.Cell>66erf6e625wr1fdk4l4442zaa4s13abchndzz4545sss2x166f1e6</Table.Cell> 
                            <Table.Cell>you</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>to</Table.Cell> 
                            <Table.Cell>ss2x11dk4l443abchndzz4545s25wr2za4a4s6666erf6e6f1e61f</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>amount</Table.Cell> 
                            <Table.Cell>2,34,88,000</Table.Cell>
                        </Table.Row> 
                    </Table.Body>
                </Table>
                <div className="buttons">
                    <button> SIGN </button>
                    <button> DECLINE </button>
                </div>
                <div className="buttons2" style={{marginTop: 30}}>
                        <button> VERIFY </button>
                </div>
            </div>
        </div>
    );
  }
}

export default SPVHandleTransaction;
