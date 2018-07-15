import React, { Component } from 'react';
import './Blockchain.css';
import Block from './Block.js'
import Main from '../Main/Main'

class Blockchain extends Component {

  render() {

    const blockList=[1,2,3,4] 

    return (
        <div>
            <Main/>
        <div id="main">
            <nav class="nav-extended center">
                <div class="nav-wrapper" style={{background: "#5d6dfc"}}>
                    <a href="#" className="brand-logo">Block List</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down"></ul>
            </div>
            </nav>
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
            </div>
            <div> 
                <h5> 
                Some details if required                     
                </h5> 
            </div>
        </div>
        </div>
    );
  }
}

export default Blockchain;
