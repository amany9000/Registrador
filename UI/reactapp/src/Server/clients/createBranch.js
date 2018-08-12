const {getMerkleTree} = require("./merkle");
const math = require("mathjs");
var createBranch = function (transactionList, buyer, root, callback){
	var count = new Number(0);
	//console.log(transactionList, buyer, root);
	for (var trans of transactionList){
		if(trans.to == buyer){
			var branch = [];
			getMerkleTree(transactionList, (tree)=>{
				returnedRoot = tree.root()
				
				if(returnedRoot != root){
					return callback("Transaction List in wrong order");
				}
				
				
				var levelCount = tree.depth()
				for (var i = 0;i < levelCount;i++){
						//console.log(Math.ceil(transactionList.length / (Math.pow(2,i))) - 1);
						if((count == Math.ceil(transactionList.length / (Math.pow(2,i))) - 1) && count %2 ==0){
							branch.push({hash : tree.level(levelCount - i)[count],position : "center"});
							//console.log("hi")												
						}
						else{
							if(count%2 == 0)
								branch.push({hash : tree.level(levelCount - i)[count + 1] , position : "right"});
							else
								branch.push({hash : tree.level(levelCount  - i)[count - 1], position: "left"});
						}
					//console.log("count :", count)
					count = Math.floor(count/2);
					
				}  	
			});
			branch.push(returnedRoot);
			console.log(branch);			
			return callback(branch);
		}
		
		count++;
	}
	return callback("Buyer's Transaction not present");
}

module.exports = {createBranch};
