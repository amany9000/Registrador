import React, { Component } from 'react';
import './SPVHandleTransaction.css';
import Main from '../Main/Main'
import { Table } from 'semantic-ui-react';

import { subscribeToTimer } from '../Api/Api';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');
let verSocket = openSocket(`http://localhost:9000`);

class SPVAddTransaction extends Component {

    state = {
        timeStamp:"",
        path: "",
        reply: "Transaction not verified Yet",
        flag1:false
    }
    discard(){
      this.setState({
        timeStamp:"",
        buyerTimeStamp:"",
        landID:"",
        from:"",
        to:"",
        amount:"",
        buyerSignature:"",
        reply: "Transaction not verified Yet",
        flag1:false
     });
    }

    makeTransaction(today){
        // make transactions and send to the network
         socket.emit('sendTransaction',{path:this.state.path, timeStamp: today});

        socket.on('verifyTransaction', async(rep) => {
            this.setState({
                reply: rep
            })            
        });

        verSocket.on('verifyTransaction', async(rep) => {
            this.setState({
                reply: rep
            })            
        });

    }

       

    verify = async ()=> {
    //verSocket = openSocket(`http://localhost:9000`);    
        console.log(this.state.reply)
        this.setState({
            flag1:true
        })    
    }

  


  render() {

    const blockList=[1,2,3,4,5,6,7,8,9,10] 
    let today = new Date().getTime();

    return (
        <div>
            <Main/>
        <div id="main">
            <div className="both" style={{
                    background: '#2bbbad'
                }}>
                <h2  className ="Head"> Add Transaction</h2>
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
                            <Table.Cell>Path of Transaction</Table.Cell> 
                            <Table.Cell><input type ="text" onChange={event => this.setState({path:event.target.value})}/></Table.Cell> 
                        </Table.Row>
                    </Table.Body>
                </Table>
                <div className="buttons">
                    <button onClick={this.makeTransaction.bind(this, today)}> CREATE </button>
                    {/* <button onClick={()=> { socket.emit('sendTransaction','huhu');}} > CREATE </button> */}
                    <button onClick={this.discard.bind(this)} > DISCARD </button>
                </div>
                <div className="buttons2" style={{marginTop: 30}}>
                        <button onClick={this.verify.bind(this)}> VERIFY </button>
                         </div>

                         {
                            this.state.flag1?
                        <div className="note1" align="center" >
                        {
                            <div>
                            {this.state.reply}
                            </div>
                        }
                        </div>
                        :
                        <div> </div>
                        }
               
            </div>
        </div>
    );
  }
}

export default SPVAddTransaction;