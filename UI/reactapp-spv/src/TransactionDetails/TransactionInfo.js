import React,{Component } from 'react';
import { List } from 'semantic-ui-react'
import './Transaction.css'


class TransactionInfo extends Component{

render(){

return(

//	<div className ="det">



	//<h4> Transaction details of the given land id are :</h4>
  
  //<ul> 
  
  this.props.transList.map((trans) => {
        return (      
  	
	   <List divided relaxed>
        <List.Item></List.Item>
        <List.Item>
          <List.Icon name='address book' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Land Address</List.Header>
            <List.Description as='b'>iiit vadodara</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='users' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Current owner</List.Header>
            <List.Description as='b'>Pankaj yadav</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='users' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Previous owner</List.Header>
            <List.Description as='b'>Rohan Dhoot</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='users' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Land coordinates</List.Header>
            <List.Description as='b' >[[1,0],[-2,1],[1,1]]</List.Description>
          </List.Content>
        </List.Item>
        <List.Item></List.Item>
      </List>
      )
	   })
    
  //</ul>  
 // </div>
	)

}



}



export default TransactionInfo;