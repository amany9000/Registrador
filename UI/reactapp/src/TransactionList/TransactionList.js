import React,{Component} from 'react'
import './TransactionList.css'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import {Link}  from 'react-router-dom';

 class Trans extends Component{
  render(){

    return(
      <div>
      <div className="eve">
      <h3 className="li"><Link to ='/'> < h3 style={{color:'white'}}><u>Home</u></h3></Link> </h3>
      <h2 className ="lis"> Land Transactions List</h2>
      </div>
      <div className = "Table">
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell> Transaction no.</Table.HeaderCell>
        <Table.HeaderCell> Seller Address</Table.HeaderCell>
        <Table.HeaderCell> Buyer Address</Table.HeaderCell>
        <Table.HeaderCell>Transaction size(in bytes)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
      <Table.Cell>1</Table.Cell>
        <Table.Cell>
          bc1qwqdg6squsna38e467
        </Table.Cell>
        <Table.Cell>sdgfdln1232nv</Table.Cell>
        <Table.Cell> 64</Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>2</Table.Cell>
        <Table.Cell>saeeirnf343fj</Table.Cell>
        <Table.Cell>dggdogrjpr4tt4</Table.Cell>
        <Table.Cell>128</Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>3</Table.Cell>
        <Table.Cell>wqfsegngnb987</Table.Cell>
        <Table.Cell>edfgjffg03u4</Table.Cell>
        <Table.Cell>70</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
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
    </Table.Footer>
  </Table>
  </div>
  </div>
  )
}
}

export default Trans;