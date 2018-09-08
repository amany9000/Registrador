import React, { Component } from 'react';
import './SPVHandleTransaction.css';
import Main from '../Main/Main'
import { Table } from 'semantic-ui-react'; 
import time from 'react-datetime';

class SPVCreateTransaction extends Component {

    state = {
        timestamp:"",
        landID:"",
        from:"",
        to:"",
        amount:""
            
    }

    makeTransaction(today){
        // make transactions and send to the networ
    }
       

  render() {
    const blockList=[1,2,3,4,5,6,7,8,9,10] ;
    let today = new Date().getTime();  

    return (
        <div>
            <Main/>
        <div id="main">
            <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head"> Create Transaction</h2>
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
                            <Table.Cell>Transaction</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>timestamp</Table.Cell> 
                            <Table.Cell>{today}</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>landID</Table.Cell> 
                            <Table.Cell><input type ="text" onChange={event => this.setState({landId:event.target.value})}/></Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>from</Table.Cell> 
                            <Table.Cell><input type ="text" onChange={event => this.setState({from:event.target.value})}/></Table.Cell> 
                            <Table.Cell>you</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>to</Table.Cell> 
                            <Table.Cell><input type="text" onChange={event => this.setState({to:event.target.value})}/></Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>amount</Table.Cell> 
                            <Table.Cell> <input type = "text" onChange={event => this.setState({amount:event.target.value})}/></Table.Cell>
                        </Table.Row> 
                    </Table.Body>
                </Table>
                <div className="buttons">
                    <button onClick={this.makeTransaction.bind(this, today)}> CREATE </button>
                    <button> DISCARD </button>
                </div>
                <div className="buttons2" style={{marginTop: 30}}>
                        <button> VERIFY </button>
                </div>
            </div>
        </div>
    );
  }
}

export default SPVCreateTransaction;
