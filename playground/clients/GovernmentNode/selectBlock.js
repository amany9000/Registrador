
const crypto = require("crypto")
const fs = require('fs')

const {updateDB} = require("./updateDB")

var selectBlock = () =>{
	var receivedBlocks = JSON.parse(fs.readFileSync("./clients/GovernmentNode/receivedBlocks.json").toString());  
	console.log(receivedBlocks);	
}

module.exports = {selectBlock}
