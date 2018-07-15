import React,{Component} from 'react'
import './TransactionList.css'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import {Link}  from 'react-router-dom';
import Trans from './Trans';
import Main from '../Main/Main'

 class TransactionList extends Component{

  state ={
    transactions: [1, 2, 3, 4]
  }

  render(){
    return(
      <div>
      <Main/>
      <div className="eve">
      <h2 className ="lis"> Land Transactions List</h2>
      </div>
      <div className = "Table">
        <Trans
        allTransactions={this.state.transactions} 
        />
      </div>
      </div>
  )
}
}

export default TransactionList;