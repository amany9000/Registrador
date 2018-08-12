# Escrow Transactions

For implementing escrow we will implement multsignature and check if all three:
+ Buyer
+ Seller
+ Escrow
all are ok with the transaction and if yes, they all will sign the transaction with their respective private key and we will check the transaction for their signatures while verifing any transaction in a block.

## Logic behind

+ Seller creates a signed transction for transfer of land to the buyer.
+ Seller sends it to the escrow from any means.
+ Escrow verifies the seller's signature.
+ Escrow now takes the money from buyer.
+ Escrow now gives buyer the dual signed transaction.
+ Buyer now signes the transaction himself and sends the transaction to the network.
+ When the transaction is successful, and escrow verifies it gives the money to seller.
 