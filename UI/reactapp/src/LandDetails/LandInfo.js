import React,{Component } from 'react';
import { List } from 'semantic-ui-react'
import './Land.css'


class LandInfo extends Component{

render(){

return(

	<div className ="det">

	<h4> Land details of the given land id are :</h4>
	
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
	


	</div>
	)

}



}



export default LandInfo;