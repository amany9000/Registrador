import React,{Component } from 'react';
import { List } from 'semantic-ui-react'
import './Transaction.css'


class TransactionInfo extends Component{

render(){

return(

  <div className ="det">

  <h4> Land details of the given land id are :</h4>
  
  <List divided relaxed>
    <List.Item></List.Item>
    <List.Item>
      <List.Icon name='users' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>LandID</List.Header>
        <List.Description as='b'>{this.props.trans.data.landID}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='users' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Seller</List.Header>
        <List.Description as='b'>{this.props.trans.data.from}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='users' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Buyer</List.Header>
        <List.Description as='b'>{this.props.trans.data.to}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='users' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Selling Price</List.Header>
        <List.Description as='b' >{this.props.trans.data.amount}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='users' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Seller TimeStamp</List.Header>
        <List.Description as='b' >{this.props.trans.data.timeStamp}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='users' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Buyer TimeStamp</List.Header>
        <List.Description as='b' >{this.props.trans.data.buyerTimeStamp}</List.Description>
      </List.Content>
    </List.Item>        
    <List.Item></List.Item>
  </List>
  


  </div>
  )

}



}



export default TransactionInfo;