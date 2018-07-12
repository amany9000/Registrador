import React, { Component } from 'react';
import './Blockchain.css';

export default class Block extends Component {
    render() {
        return (
            <div>
            <div className="card--content">
                <h4 style={{background: 'salmo'}}>
                    Hash
                </h4>
                <h6>
                    TimeStamp
                </h6>
                <h6>
                    Some other information
                </h6>
                <h6>
                    Other information again 
                </h6>
            </div>
            </div>
        );
    }
}