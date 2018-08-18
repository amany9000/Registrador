import React,{Component} from 'react'; 
import { List, Segment ,Icon} from 'semantic-ui-react'; 
import './TransactionDetails.css'; 
import yes from '../images/yes.jpg' 
import Main from '../Main/Main' 

 class TransactionDetails extends Component { 
 
  render(){ 
    return ( 
      <div>
        <Main/>
      <div className="both" style={{
					 background: '#2bbbad'
				 }}>
             	<h2  className ="Head">Transaction Details</h2>
             	</div>
        <Segment stacked className="center"> 35UPGVBX99ekzXF3xDoKJGwCA9UJ2PXuDg </Segment> 
        <div align ="center"><Icon.Group size='large' >
      <Icon color="teal"name='arrow down'  />
        </Icon.Group>
        </div>


        <Segment stacked className="center"> sdpgsog123445346soifgndf345454977 </Segment> 
          
       
  <Segment inverted style={{
    opacity: 0.8
  }}> 
    <List divided inverted relaxed> 
      <List.Item> 
        <List.Content> 
          <List.Header>Transaction Hash</List.Header> 
          0beaa61023bc0d25b7e8dd54be319e740d1a2f3ffb7691bde089355554163d0e 
        </List.Content> 
      </List.Item> 
      <br></br> 
      <List.Item> 
        <List.Content> 
          <List.Header>Total Input(in $)</List.Header> 
            11.32 
        </List.Content> 
      </List.Item> 
      <br></br> 
      <List.Item> 
        <List.Content> 
          <List.Header>Total output(in $)</List.Header> 
            7.72 
        </List.Content> 
      </List.Item> 
      <br></br> 
      <List.Item> 
        <List.Content> 
          <List.Header>Transaction Size(in bytes)</List.Header> 
           64
           </List.Content> 
        </List.Item> 
        <br></br> 
        <List.Item> 
          <List.Content> 
            <List.Header>Transaction Fees(in $)</List.Header> 
            3.62 
          </List.Content> 
        </List.Item> 
        <br></br> 
        <List.Item> 
          <List.Content> 
            <List.Header>Timestamp</List.Header> 
            30-07-2016 04:15:21 
          </List.Content> 
        </List.Item> 
        <br></br> 
        <List.Item> 
          <List.Content> 
            <List.Header>Included in block</List.Header> 
            243 
          </List.Content> 
        </List.Item> 
      </List> 
    </Segment>

     </div> 
  ) 
} 
} 
 
export default TransactionDetails;
