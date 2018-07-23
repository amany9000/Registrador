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
                <p>
                    <b>Merlkle Root Hash</b>
                    <br></br>
                    <Link to ='/BlockDetails'><u>{this.props.block.hashMerkleRoot}</u></Link>
                </p>
                <p>
                    <b>Previous Block Hash</b>
                    <br></br>
                    {this.props.block.hashPrevBlock}
                </p>
                <p>
                    <b>Block Time Stamp</b> {this.props.block.blockTimeStamp}
                </p>
                <p>
                    <b>Block Height</b> {this.props.block.blockHeight}
                </p>
            </div>
            <div class="card--content2"></div>
            </div>
        );
    }
}