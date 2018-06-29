# Models

## classes
* user ( user details )
* land ( land details )
* transaction ( land deal details )

### user
* class
    + confirms the model is of user class
* id
    + publicKey of the user
* type 
    + type of the user - Gov. Node / Full Node / SPV           
* currentAssets
    + array of ids of the current land assets with the user
* previousAssets
    + array of ids of the previous land assets with the user

### land
* class
    + confirms the model is of land class
* id
    + id of the land (  function of latLong containing hash function )
* latLong
    + array of its latitude and longitude of its corners
* address 
    + address of the location   
* owner
    + id of the present owner of the land
* prevOwner
    + list of IDs of the previous owners of the land
* lastSellingPrice 
    + last Selling Price 

### transaction
* class
    + confirms the model is of transaction class
* type 
    + type of transaction - default / newUser / escrow
* timestamp
    + time of transaction
* landID
    + id of the land being trasferred     
* from
    + id of user seller
* to
    + id of user buyer
* amount
    + price for the land has been exchanged
* lockTime 
    + hold time for the transaction (not null only in escrow trancastion )

### block 
* class
    + confirms the model is of block class
* blockHeader - necessary information (requirred for SPV verification) 
    +  blockHeight - height of the block since genesis block 
    +  hashPrevBlock - hash of the previous block
    +  hashMerkleRoot - hash of the merkle root of transactions
    +  blockTimeStamp - Time of block creation  
* blockSize
    + size of the block
* transactionCount
    + total no. of transactions in the block
* transactionList
    + list of all transactions in the block
* blockGenerator
    + public key of the node which generated the block