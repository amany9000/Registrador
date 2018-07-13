import React, { Component } from 'react';
import './Blockchain.css';
import Block from './Block.js'

class Blockchain extends Component {
  render() {
    return (
        <div id="main">
            <nav class="nav-extended center">
                <div class="nav-wrapper" style={{background: "#5d6dfc"}}>
                    <a href="#" className="brand-logo">Block List</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down"></ul>
            </div>
            </nav>
            <div id="chain">
                <section className="card">
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
                    <div className="card--content2"></div>
                    <div className="card--content">
                        <h4 className="background: salmon;">
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
                    <div className="card--content2"></div>
                    <div className="card--content">
                        <h4 className="background: salmon;">
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
                    <div className="card--content2"></div>
                    <div className="card--content">
                        <h4 className="background: salmon;">
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
                    <div className="card--content2"></div>
                    <div className="card--content">
                        <h4 className="background: salmon;">
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
                    <div className="card--content2"></div>
                    <div className="card--content">
                        <h4 className="background: salmon;">
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
                </section>
            </div>
        </div>
    );
  }
}

export default Blockchain;
