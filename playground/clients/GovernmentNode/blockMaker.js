  
var	{transactionVerify} = require("./transactionVerify")

var blockMaker = async (transElementList, transactionList, callback) => {
	/*var copyElement = transactionElementList.map((element) => element.transaction);	
	for(var i=0; i<transactionElementList.length; i++){
		
		transactionVerify([copyElement[i]], (reply) => {
			console.log(i,reply)
			console.log("ele", transactionElementList[i])
			if(reply != "verified"){
				transactionElementList.splice(i,1)
				i = i-1;
			}
			else{
				transactionElementList[i].priority++;				
			}

		});
	} */
	/*
	for(var i=0; i<transactionList.length; i++){

		await transactionVerify([transactionList[i]], (reply) => {
			console.log(i,reply)
			if(reply === "verified"){
				transactionElementList.push({
					priority: 0,
					transaction: transactionList[i]  	
				})
			}
					console.log("t" ,transactionElementList); 		  

		});		

	} */ 
	await transactionVerify(transactionList,(reply)=>{
		console.log(reply)
	});
	//console.log("b",bool);
	/*for(var i of bool){
		console.log("for ",i);
	}*/
}

blockMaker([{
		priority : 0,
		transaction : {
			class: "transaction",
			timeStamp: 123456345,
			landID: "land23",
			from: ["User3","User4"],
			to: ["User2"],
			amount: 123213 
		}
	},{
		priority : 0,
		transaction : {
			class: "transaction",
			timeStamp: 12324562,
			landID: "land45",
			from: ["User3"],
			to: ["User1"],
			amount: 1232
		}
	}],[{
			class: "transaction",
			timeStamp: 1456,
			landID: "land2345",
			from: ["User1"],
			to: ["User2"],
			amount: 90123213 
		},{
			class: "transaction",
			timeStamp: 123456,
			landID: "land67",
			from: ["User2"],
			to: ["User1"],
			amount: 123213234 
		}],(reply) =>{
		console.log(reply);
	});