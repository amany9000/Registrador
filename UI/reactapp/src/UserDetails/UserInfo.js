import React,{Component} from 'react';
import { Message } from 'semantic-ui-react';
import './User.css';

import getUser from './getDoc.js';


class UserInfo extends Component{


	render(){
		return(
		<div className ="deta">
		<Message>
    <Message.Header>Land Id of current Land owned by the user</Message.Header>
    <Message.List>
      <Message.Item>asfngn495972</Message.Item>
      <Message.Item>sdjhgehre495</Message.Item>
    </Message.List>
  </Message>

      <Message>
    <Message.Header>Land Id of previous Land owned by the user</Message.Header>
    <Message.List>
      <Message.Item>safj9geh0geth9</Message.Item>
      <Message.Item>sdjhgehreew44</Message.Item>
    </Message.List>
  </Message>
  </div>
			)
	}
}





export default UserInfo;