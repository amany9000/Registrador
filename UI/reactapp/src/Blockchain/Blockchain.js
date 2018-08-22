import React, { Component } from 'react';
import './Blockchain.css';
import Block from './Block.js'
import Main from '../Main/Main'
import { Table } from 'semantic-ui-react'; 

class Blockchain extends Component {

  render() {

    // var some = require('./abc.json');
    var blockList = require('../Server/clients/GovernmentNode/recievedBlocks.json');

    return (
        <div>
            <Main/>
        <div id="main">
            <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head">Blockchain</h2>
            </div>
            <div id="chain">
                <section className="card">
                {
                    blockList.map((item, index) => { 
                        return( 
                            <Block 
                                block={item} 
                            /> 
                        ); 
                    }) 
 
                } 
                </section>
                <div style={{
                    opacity: 0.8,
                    marginRight: 50,
                    marginLeft: 50
                }}>
                <Table celled> 
                    <Table.Header> 
                        <Table.Row> 
                        <Table.HeaderCell> Block Hash </Table.HeaderCell> 
                        <Table.HeaderCell> Percentage </Table.HeaderCell> 
                        </Table.Row> 
                    </Table.Header> 
   
                    <Table.Body>   
                        <Table.Row> 
                            <Table.Cell>nvbsdfoen12345648974</Table.Cell> 
                            <Table.Cell>70</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>sdfoeidhodd345648974</Table.Cell> 
                            <Table.Cell>17</Table.Cell> 
                        </Table.Row> 
                        <Table.Row> 
                            <Table.Cell>dfoe8974nvbn123456s4</Table.Cell> 
                            <Table.Cell>13</Table.Cell> 
                        </Table.Row> 
                    </Table.Body>
                </Table>
                </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Blockchain;
