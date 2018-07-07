const {createBranch} = require("./createBranch");

var transactionList= [{           // list of transations of the last block 
    timestamp: 123456890,
    landID : 45,
    from: "userid4",
    to: "userid2",
    amount: 900000000},
    {timestamp: 32,
    landID : 99,
    from: "useridA",
    to: "useridB",
    amount: 999999900},
    {
    timestamp: 1290,
    landID : 451,
    from: "userid5",
    to: "userid6",
    amount: 40000},
    {
    timestamp: 10,
    landID : 405,
    from: "useridG",
    to: "useridU",
    amount: 9},
    {
    timestamp: 120,
    landID : 45311,
    from: "userid6",
    to: "userid7",
    amount: 3000}
];
const root  =   "4DC966AAB74925A8E091473B7E842DBBD4184186FB6D56752F518055D221659B";
var getBranch = function (buyer, callback){
     createBranch(transactionList,buyer,root,(branch) => {     //Merkel root will be 
            if(branch == "Buyer's Transaction not present"){                                      //present in the block being searched
                console.log("Buyer Not Present");
                //Run the function again with transactionList of previous block
            }
            else if( branch == "Transaction List in wrong order"){
                //Run the Transaction Piority Sort Again
            }
            else{
                return callback(branch);                                              
            }
    })                                                                                
};

module.exports =  {getBranch};
