import React, {Component} from 'react' 
import { Icon, Label, Menu, Table } from 'semantic-ui-react'; 
import {Link } from 'react-router-dom';
 

export default class Trans extends Component { 
 
  render(){ 
    return( 
      <div> 
      <Table celled> 
      <Table.Header> 
        <Table.Row> 
          <Table.HeaderCell> Seller Address</Table.HeaderCell> 
          <Table.HeaderCell> Buyer Address</Table.HeaderCell> 
          <Table.HeaderCell> LandId</Table.HeaderCell>
          <Table.HeaderCell> Amount</Table.HeaderCell>            
        </Table.Row> 
      </Table.Header> 
   
      <Table.Body>   
      {
        this.props.allTransactions.map((transaction)=>{ 
            return( 
              <Table.Row> 
              <Table.Cell><Link to='/TransactionDetails'><u>{transaction.data.from}</u></Link></Table.Cell> 
                <Table.Cell>{transaction.data.to}</Table.Cell> 
                <Table.Cell>{transaction.data.landID}</Table.Cell> 
                <Table.Cell>{transaction.data.amount}</Table.Cell> 
              </Table.Row> 
            ); 
          })   
          } 
          </Table.Body> 
           
          {/* <Table.Footer> 
            <Table.Row> 
              <Table.HeaderCell colSpan='4'> 
                <Menu floated='right' pagination> 
                  <Menu.Item as='a' icon> 
                    <Icon name='chevron left' /> 
                  </Menu.Item> 
                  <Menu.Item as='a'>1</Menu.Item> 
                  <Menu.Item as='a'>2</Menu.Item> 
                  <Menu.Item as='a'>3</Menu.Item> 
                  <Menu.Item as='a'>4</Menu.Item> 
                  <Menu.Item as='a' icon> 
                   <Icon name='chevron right' /> 
              </Menu.Item> 
            </Menu> 
          </Table.HeaderCell> 
        </Table.Row> 
      </Table.Footer> */} 
    </Table> 
  </div> 
 
    ); 
  } 
   
}
