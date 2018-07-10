import React,{Component} from 'react';
import { List, Segment ,Icon} from 'semantic-ui-react';
import './App.css';
import yes from './yes.jpg'

 class New extends Component {

  render(){
    return (
      <div >
        <h2 className ="Tran">Transaction Info</h2>
        <Segment stacked className="center"> 35UPGVBX99ekzXF3xDoKJGwCA9UJ2PXuDg </Segment>
         
         <div className="Icon"><Icon.Group size='large' >
      <Icon color="teal"name='arrow down'  />
        </Icon.Group>
        </div>

        <Segment stacked className="center"> 3Lauk5Z4AvXCFPU9SpUo76Ybee55FQAKPp </Segment>

      
  <Segment inverted>
    <List divided inverted relaxed>
      <List.Item>
        <List.Content>
          <List.Header>Transaction Hash</List.Header>
          0beaa61023bc0d25b7e8dd54be319e740d1a2f3ffb7691bde089355554163d0e
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Total Input(in $)</List.Header>
            11.32
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Total output(in $)</List.Header>
            7.72
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Transaction Size(in bytes)</List.Header>
           64 
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Transaction Fees(in $)</List.Header>
           3.62
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Timestamp</List.Header>
           30-07-2016 04:15:21
        </List.Content>
      </List.Item>
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

export default New;