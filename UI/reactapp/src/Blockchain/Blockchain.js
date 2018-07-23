import React, { Component } from 'react';
import './Blockchain.css';
import Block from './Block.js'
import Main from '../Main/Main'
import { Table } from 'semantic-ui-react'; 

class Blockchain extends Component {

  render() {

    const blockList=[
        { blockHeight: 0,
            hashPrevBlock:
             'fea8529a5e893b0bc507a2aba9c201d33885b0665d8017ee1c9f18d1dc33b16b',
            hashMerkleRoot:
             '6CBC1924435767BE98FF9B66B824FE5CED17B9B3C627C089A3CE92CDF529CBBF',
            blockTimeStamp: 1531399180434 },
        { blockHeight: 1,
            hashPrevBlock:
             'e893bfea8529a50a9c201dbc507a2ab3306618d15d8017ee1c9fdc33b885b16b',
            hashMerkleRoot:
             'BE98F19244357F9B66B826CBC67277B9B3C089A3CE92CDF529CBBF4FE5CED1C6',
            blockTimeStamp: 1531399180434 },
        { blockHeight: 3,
            hashPrevBlock:
             'bfa50a98529de8938017c201dbc507a2ab3306618d15eaee1c9fdc33b885b16b',
            hashMerkleRoot:
             'BB826E98F1924435BC67277B9B3C05294FE5C7F9B66C89A3CE9CBBF2CDFED1C6',
            blockTimeStamp: 1531399180434 },
        { blockHeight: 2,
            hashPrevBlock:
             '50a9de89380179852bbc507a2ab3306618d15fac2e1c9fdc3e6b3b885b101dea',
            hashMerkleRoot:
             'C672826E98F19BB35B9B3C05294FE5C7B24477F9B9CBBF29A3CEED1C6CDF66C8',
            blockTimeStamp: 1531399180434 },
    ]

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
