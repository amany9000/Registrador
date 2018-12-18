import React,{Component} from 'react'
import './TransactionList.css'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import {Link}  from 'react-router-dom';
import Trans from './Trans';
import Main from '../Main/Main'

/*
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "../Server/clients/GovernmentNode/TransactionList.json", true);
oReq.responseType = "json"
oReq.send();
var list;
function reqListener(e) {
    console.log("response",this.response)
    //list = JSON.parse(this.responseText);
    //console.log(list);
}*/
var list = require("./transList.json")
 class TransactionList extends Component{

  state ={
    transactions: list
  }

  render(){
    return(
      <div id="hello">
      <Main/>
      <div className="eve">
      <h2 className ="lis"> Land Transactions List</h2>
      </div>
      <div className = "Table">
        <Trans
        allTransactions={this.state.transactions} 
        />
      </div>
      <div align = "center" className ="Note">
      <h3 style={{
        color: 'white'
      }}> Note : <u>Please click on the transaction hash to see the full transaction info</u></h3>
      </div>
      </div>
  )
}
}

export default TransactionList;