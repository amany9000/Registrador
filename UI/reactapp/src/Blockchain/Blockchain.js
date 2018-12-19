import React, { Component } from 'react';
import './Blockchain.css';
import Block from './Block.js'
import Main from '../Main/Main'
import { Table } from 'semantic-ui-react'; 
import Blockfreq from './Blockfreq.js';


var blockList = require('./Blockchain.json');
var freqList = require('../Server/clients/GovernmentNode/blockFreqList.json');
class Blockchain extends Component {

  render() {

    // var some = require('./abc.json');

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
                    blockList.map((item) => { 
                        return( 
                            <Block 
                                block={item} 
                            /> 
                        ); 
                    }) 
 
                } 
                </section>
                <div >
                <Table celled> 
                    <Table.Header> 
                        <Table.Row> 
                        <Table.HeaderCell > Block Hash </Table.HeaderCell> 
                        <Table.HeaderCell> Percentage </Table.HeaderCell> 
                        </Table.Row> 
                    </Table.Header> 
   
                    <Table.Body>   
                       
                        {
                    freqList.map((item, index) => { 
                        return( 
                            <Blockfreq 
                                blockfreq={item} 
                            /> 
                        ); 
                    }) 
 
                } 
                        
                       
                
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
