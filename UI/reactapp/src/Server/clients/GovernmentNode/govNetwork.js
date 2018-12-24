  
const crypto = require('crypto');
const Swarm = require('discovery-swarm');
const defaults = require('dat-swarm-defaults');
const getPort = require('get-port');
const readline = require('readline');
const io = require('socket.io')();
const fs  = require("fs");
const async = require("async");

const {blockVerify} = require("./blockVerify");   
var {transactionVerify} = require("./transactionVerify")
const peers = {}
// Counter for connections, used to identify connections
let connSeq = 0

// Peer Identity, a random hash for identify your peer
const myId = crypto.randomBytes(32)
console.log('Your identity: ' + myId.toString('hex'))

// reference to redline interface
let rl
var a =5;
i=0;
function log () {
  if (rl) {
    rl.clearLine()
    rl.close()
    rl = undefined
  }
  for (let i = 0, len = arguments.length; i < len; i++) {
    console.log(arguments[i])
  }

}

/** 
 * Default DNS and DHT servers
 * This servers are used for peer discovery and establishing connection
 */
const config = defaults({
  // peer-id
  id: myId,
})

/**
 * discovery-swarm library establishes a TCP p2p connection and uses
 * discovery-channel library for peer discovery
 */                  var i = 0;

    
const sw = Swarm(config)


;(async () => {

  const port = await getPort()
  sw.listen(port)
  console.log('Listening to port: ' + port)
  
  var lastHeight = 4;
  const port2 = await getPort();
io.listen(port2);
console.log('listening on port ', port2);

io.on('connection', (client) => {
  client.on('sendTransaction', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    for (let id in peers) {
 peers[id].conn.write(JSON.stringify({"text" : interval, "me" : myId.toString("hex")},undefined,2))    }  
  });
});
  /**
   * The channel we are connecting to.
   * Peers should discover other peers in this channel
   */
await sw.join('catalyst')

  sw.on('connection', (conn, info) => {
    // Connection id
    async.whilst(
  function () {return Boolean(fs.readFileSync("./clients/GovernmentNode/boolean.log").toString())},
  function (callback){
    
    setTimeout(callback, 1000);
    var block = JSON.parse(fs.readFileSync("./clients/GovernmentNode/block.json").toString(),undefined,2)
    if(!block.header){
      fs.writeFileSync("./clients/GovernmentNode/boolean.log","");
    }
    else{
    if(new Date().getMinutes() === 52){
      if(lastHeight + 1 === block.header.blockHeight){
        console.log("dhun dhun dhun 143", block);
        lastHeight++;
        var count = 0;
        for (let id in peers) {
          peers[id].conn.write(JSON.stringify(block,undefined,2))
        }
        fs.writeFileSync("./clients/GovernmentNode/block.json",JSON.stringify({},undefined,2));
        fs.writeFileSync("./clients/GovernmentNode/boolean.log","");
      }          
    }}
  },
  function (){
    fs.writeFileSync("./clients/GovernmentNode/boolean.log","true");
  }
)
    //fs.writeFileSync("./clients/GovernmentNode/boolean.log","true");

    const seq = connSeq
    const peerId = info.id.toString('hex')
    log(`Connected #${seq} to peer: ${peerId}`)

    // Keep alive TCP connection with peer
    if (info.initiator) {
      try {
        conn.setKeepAlive(true, 600)
      } catch (exception) {
        log('exception', exception)
      }
    }
    conn.on('data', data => {

      // Here we handle incomming messages
      try{
        var message = JSON.parse(data);
      } catch(e){
        console.log("Inbound data not a json");
      }
      
      log(
        'Received Message from peerzzz ' + peerId,
        '----> ' + data
      )
      if(message!= null && message!= undefined && message.class!= null && message.class!= undefined && message.class ==  "block"){
        blockVerify(message, (reply) => {
          console.log("rep",reply)
          if(reply != "verified"){
            console.log("block not correct");
          }
          else{
          var receivedBlocks = JSON.parse(fs.readFileSync("./clients/GovernmentNode/recievedBlocks.json").toString());  
          receivedBlocks.push(message)
          fs.writeFileSync("./clients/GovernmentNode/recievedBlocks.json", JSON.stringify(receivedBlocks,undefined,2));
        }
        });
      }
      else if(message!= null && message!= undefined && message.class!= null && message.class!= undefined && message.class == "transaction"){ 
        if(Boolean(fs.readFileSync("./clients/GovernmentNode/halted.log").toString())){
          var haltedList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/haltedList.json").toString());          
          haltedList.forEach((trans) =>{
            transactionVerify([trans], (reply) => {
              console.log(reply)

              if(reply[0]){
                for (let id in peers) {
                  peers[id].conn.write(JSON.stringify(trans,undefined,2))
                }
              }              
            })
          });
          fs.writeFileSync("./clients/GovernmentNode/halted.log","");
          fs.writeFileSync("./clients/GovernmentNode/haltedList.json",JSON.stringify([], undefined, 2));          
        
          var branchList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/branchList.json").toString());               
          if(branchList.length != 0){
            for (let k in branchList){
                if(peers[branchList[k].peerId]){
                  peers[branchList[k].peerId].conn.write(JSON.stringify({
                    "class": "verReply",
                    "data": {
                     "branch": branchList[k].branch,
                     "header": branchList[k].header,
                      "landID": branchList[k].landID
                    }},undefined,2))         
                    branchList.filter((element) => element.landID != branchList[k].landID)  
                }
            }
            fs.writeFileSync("./clients/GovernmentNode/branchList.json",JSON.stringify(branchList, undefined, 2));          
          }
        }
        
        if(new Date().getMinutes() >= 59 && new Date().getSeconds() >= 30){
            var haltedList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/haltedList.json").toString());  
            haltedList.push(message)
            fs.writeFileSync("./clients/GovernmentNode/haltedList.json", JSON.stringify({},undefined,2));              
        }
                
        else{
          transactionVerify([message], (reply) => {
            console.log("rep - ",reply,i++)
            if(!reply[0]){
              console.log("Transaction not correct");
            }
            else{
              var transactionList = JSON.parse(fs.readFileSync("../TransactionList/transList.json").toString());               
              transactionList.push(message)
              fs.writeFileSync("../TransactionList/transList.json", JSON.stringify(transactionList,undefined,2));
            }
          })
        }
      }
      else if(message!= null && message!= undefined && message.class!= null && message.class!= undefined && message.class == "verTransaction"){
        var verTransList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/verTransList.json").toString());               
        verTransList.push({
          peerId : peerId,
          transaction: message
        })
        fs.writeFileSync("./clients/GovernmentNode/verTransList.json", JSON.stringify(verTransList,undefined,2));        
      }       
    })
    
    conn.on('close', () => {
      // Here we handle peerser disconnection
      log(`Connection ${seq} closed, peer id: ${peerId}`)
      // If the closing connection is the last connection with the peer, removes the peer
      if (peers[peerId].seq === seq) {
        delete peers[peerId]
      }
    })

    // Save the connection
    if (!peers[peerId]) {
      peers[peerId] = {}
    }
    peers[peerId].conn = conn
    peers[peerId].seq = seq
    connSeq++

  })
  
})()

