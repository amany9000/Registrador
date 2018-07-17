import React, { Component } from 'react';
import './Blockchain.css';
import Block from './Block.js'
import Main from '../Main/Main'

class Blockchain extends Component {

  render() {

    const blockList=[1,2,3,4,5,6,7,8,9,10] 

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
            </div>
        </div>
        </div>
    );
  }
}

export default Blockchain;
