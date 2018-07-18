import React, { Component } from 'react';
import './Blockchain.css';
import {Link}  from 'react-router-dom';

export default class Block extends Component {
    render() {
        return (
            <div style={{
                display: 'flex'
            }}>
            <div className="card--content">
                <h4>
                    <Link to ='/BlockDetails'><u>Hash</u></Link>
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
            <div class="card--content2"></div>
            </div>
        );
    }
}