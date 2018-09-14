import React, { Component } from 'react';
import './Blockchain.css';
import { Table } from 'semantic-ui-react'; 
import {Link}  from 'react-router-dom';

export default class Block extends Component {
    render() {
        return (
           
                
                    <div style={{
                    opacity: 0.8,
                    marginRight: 50,
                    marginLeft: 50
                }}>
                    
                    <Table.Row> 
                             <Table.Cell>{this.props.blockfreq.hash}</Table.Cell> 
                             <Table.Cell>{this.props.blockfreq.freq}</Table.Cell> 
                         </Table.Row> 

                         </div>
            
        );
    }
}