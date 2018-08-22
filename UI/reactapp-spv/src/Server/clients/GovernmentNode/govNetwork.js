
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
  
  var lastHeight = 569;
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
await sw.join('rohandhoot')

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
    if(new Date().getMinutes() === 57 && new Date().getSeconds() === 0){
      if(lastHeight + 1 === block.header.blockHeight){
        console.log("dhun dhun dhun 143", block);
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
    console.log("dont")
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
              
              var pendingList = (fs.readFileSync("./clients/GovernmentNode/pendingList.log").toString()).split(",");                
              if(pendingList.indexOf('') != -1){
                pendingList.splice(pendingList.indexOf(''),1)
              }
              pendingList.push(message.data.landID);
              
              fs.writeFileSync("./clients/GovernmentNode/pendingList.log", pendingList);
              if(reply[0]){
                for (let id in peers) {
                  peers[id].conn.write(JSON.stringify(trans,undefined,2))
                }
              }              
            })
          });
          fs.writeFileSync("./clients/GovernmentNode/halted.log","");
          fs.writeFileSync("./clients/GovernmentNode/haltedList.json",JSON.stringify([], undefined, 2));          
        }
        if(new Date().getMinutes() >= 59 && new Date().getSeconds() >= 30){
            var haltedList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/haltedList.json").toString());  
            haltedList.push(message)
            fs.writeFileSync("./clients/GovernmentNode/haltedList.json", JSON.stringify(haltedList,undefined,2));              
        }
        else{
          transactionVerify([message], (reply) => {
            console.log(reply)
            if(!reply[0]){
              console.log("Transaction not correct");
            }
            else{
              io.emit('getTransaction', JSON.stringify(message, undefined, 2));
              var transactionList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/transactionList.json").toString());  
              var pendingList = (fs.readFileSync("./clients/GovernmentNode/pendingList.log").toString()).split(",");                
              transactionList.push(message)
              if(pendingList.indexOf('') != -1){
                pendingList.splice(pendingList.indexOf(''),1)
              }
              //console.log(pendingList, pendingList.length)
              pendingList.push(message.data.landID);
              fs.writeFileSync("./clients/GovernmentNode/pendingList.log", pendingList);              
              fs.writeFileSync("./clients/GovernmentNode/transactionList.json", JSON.stringify(transactionList,undefined,2));
            }
          })
        }
      } 
    })
    
    conn.on('close', () => {
      // Here we handle peer disconnection
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

