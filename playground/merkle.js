const merkle = require("merkle");

var transactionList= [{
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

//var merkelRoot = function(transactionList){
    var x = [];
    for(var i in transactionList){
        x.push(JSON.stringify(transactionList[i],undefined,2));
    } 

    console.log(x)
    //abcd = ['a','b','c','d','e']

    merkle("sha256").async(x, (err,tree) => {
    console.log("\nsha256 merkel root - ", tree.root());
    console.log("depth of the tree - ",tree.depth());
    console.log("Total no. of levels - ",tree.levels());
    console.log("total no. of nodes - ",tree.nodes());
    console.log("Level 3 of SHA256 hashes (leaves) -\n", tree.level(3))
    //return tree;
    });

    merkle("sha512").async(x, (err,tree) => {
    console.log("\nsha512 merkel root - ", tree.root());  
    });

//}