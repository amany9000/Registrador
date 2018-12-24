
const crypto = require('crypto');
const Swarm = require('discovery-swarm');
const defaults = require('dat-swarm-defaults');
const getPort = require('get-port');
const readline = require('readline');
const io = require('socket.io')();
const io2 = require('socket.io')();
const fs  = require("fs");
const openSocket = require("socket.io-client")
const {transSigCreate} = require("./sign.js");
const {checkBranch}  =require("./spv.js")
var base64Img = require('base64-img');
const peers = {}
// Counter for connections, used to identify connections
let connSeq = 0

// Peer Identity, a random hash for identify your peer
const myId = crypto.randomBytes(32)
console.log('Your identity: ' + myId.toString('hex'))

// reference to redline interface
let rl
let flag2  = false
function log () {
  if (rl) {
    rl.clearLine()
    rl.close()
    rl = undefined
  }
  for (let i = 0, len = arguments.length; i < len; i++) {
    console.log(arguments[i])
  }
  askUser()
}

const askUser = async () => {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Send message: ', message => {
    // Broadcast to peers
    for (let id in peers) {
      peers[id].conn.write(JSON.stringify({"text" : message, "me" : myId.toString("hex")},undefined,2))
    }    
    rl.close()
    rl = undefined
    askUser()
  });
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
 */
const sw = Swarm(config)


;(async () => {

  const port = await getPort()
  sw.listen(port)
  console.log('Listening to port: ' + port)

//io2.listen(9000);

function  receive(message) {
        if(message.class == "verReply"){
          checkBranch(message).then((flag)=>{
            if(flag){
              console.log(`Transaction included in Block No. ${message.data.header.blockHeight}`);
              //if(!flag2){
                io2.listen(9000);                
              //  flag2 = true;
              //}
              io2.on('connection', (client) => {
                client.emit('verifyTransaction', `Transaction included in Block No. ${message.data.header.blockHeight}`);
                //client.disconnect()
              });
              var pendingTrans = JSON.parse(fs.readFileSync("./src/pendingTrans.json").toString(),undefined,2)    

              pendingTrans =  pendingTrans.filter((trans) => trans.data.landID !== message.data.landID)
              //console.log("pending",trans.data.landID,message.data.landID)
              fs.writeFileSync("./src/pendingTrans.json",JSON.stringify(pendingTrans,undefined,2));              

              delete pendingTrans
            }
            else{
              console.log("Branch not correct")
              //if(!flag2){
              //  console.log("I dont know")
                io2.listen(9000);                
              //  flag2 = true;
              //}
                io2.on('connection', (client) => {
                console.log("heyyyyy")
                client.emit('verifyTransaction', `Transaction not Included`);
                //client.disconnect()
              });
            }
          })
        }  
}
const port2 = 8000;
io.listen(port2);
io.on('connection', (client) => {
  client.on('sendTransaction', async(transaction) => {
    console.log("t",transaction);
    
    var signature = await transSigCreate(transaction);
    
    if(transaction.buyerSignature === ""){
      transaction["buyerSignature"] = signature;
      console.log(transaction)
      fs.writeFileSync("./outputs/draft.json",JSON.stringify(transaction,undefined,2));    
    }
    else{
      var pendingTrans = JSON.parse(fs.readFileSync("./src/pendingTrans.json").toString(),undefined,2)
      
      if(pendingTrans.find((trans) => {return (trans.data.landID === transaction.data.landID)})){
        console.log("pppppp")
        client.emit('verifyTransaction', `A transaction of the landID ${transaction.data.landID} is already pending.`);
      }          
      else{
        transaction["sellerSignature"] = signature;
        pendingTrans.push(transaction)
        fs.writeFileSync("./src/pendingTrans.json",JSON.stringify(pendingTrans,undefined,2));    
        delete pendingTrans;
        for (let id in peers) {
        peers[id].conn.write(JSON.stringify(transaction,undefined,2))
        }
        setTimeout(() => {
          for (let id in peers) {
            peers[id].conn.write(JSON.stringify({
            class: "verTransaction",
            data: {
              landId: transaction.data.landID
              } 
            },undefined,2))
          }
        },2000);
      }
    }
    //client.emit("verifyTransaction","testing")
  });
  /*
  client.on("verifyTransaction", async () => {
    var pendingTrans = JSON.parse(fs.readFileSync("./src/pendingTrans.json").toString(),undefined,2)
    console.log("pend", pendingTrans.data.landID, pendingTrans.data)            
  })*/  
});
//io.disconnect();
  /**
   * The channel we are connecting to.
   * Peers should discover other peers in this channel
   */
sw.join('catalyst')

  sw.on('connection', (conn, info) => {
    // Connection id
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

    conn.on('data',  (data) => {
      // Here we handle incomming messages
      console.log("message recieved - ", data.toString());      
      var message = JSON.parse(data);      
      if(message!= null && message!= undefined && message.class!= null && message.class!= undefined && message.class == "verReply"){
          receive(message)
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

  askUser()  

})()
