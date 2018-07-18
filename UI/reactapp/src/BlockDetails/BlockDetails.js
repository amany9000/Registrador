import React,{Component} from 'react'; 
import { List, Segment ,Icon} from 'semantic-ui-react'; 

import yes from '../images/yes.jpg' ;
import Main from '../Main/Main' ;

 class BlockDetails extends Component { 
 
  render(){ 
    return ( 
      <div>
        <Main/>
      <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head">Block Details</h2>
             	</div>
        
          
       
  <Segment inverted style={{
    opacity: 0.8
  }}> 
    <List divided inverted relaxed> 

       <List.Item>
      <List.Icon name='block layout' />
      <List.Content>
        <List.Header>Block Header</List.Header>
        
        <List.List>
          <List.Item>
            <List.Icon name='block layout' />
            <List.Content>
              <List.Header>Block height</List.Header>
              <List.Description>35786</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='block layout' />
            <List.Content>
              <List.Header>Previous Block Hash</List.Header>
              <List.Description>setot44834922rjgjg43</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='block layout' />
            <List.Content>
              <List.Header> Merkle Root Hash</List.Header>
              <List.Description>fsgji59593gjg43</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='block layout' />
            <List.Content>
              <List.Header> Block Timestamp</List.Header>
              <List.Description>24-07-2017 11:34</List.Description>
            </List.Content>
          </List.Item>
        </List.List>
      </List.Content>
    </List.Item>
  
      <List.Item> 
      <List.Icon name='block layout' />
        <List.Content> 
          <List.Header>Block Size</List.Header> 
             <List.Description>345</List.Description>
        </List.Content> 
      </List.Item> 
      
      <br></br> 
      <List.Item> 
      <List.Icon name='block layout' />
        <List.Content> 
          <List.Header>Block Generator</List.Header> 
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0gv4+6ExB1KFh6AjTv5N
        </List.Content> 
      </List.Item>
      <br></br> 
      <List.Item> 
      <List.Icon name='block layout' />
        <List.Content> 
          <List.Header>Transaction count</List.Header> 
            <List.Description>4</List.Description>
        </List.Content> 
      </List.Item>  

      
        
        
      






      </List> 
    </Segment>

  

     </div> 
  ) 
} 
} 
 
export default BlockDetails;
