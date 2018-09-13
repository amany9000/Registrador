const {getMerkleTree} = require("./merkle");
const math = require("mathjs");
var createBranch = function (transactionList, root, callback){
    var verTransList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/verTransList.json").toString());               
	
	var branchList = [];
	for (let j in verTransList){
		var count = new Number(0);
		//console.log(transactionList, buyer, root);
		for (var trans of transactionList){
			if(trans.data.landId == verTransList.data.landId){
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
				verTransList.splice(j,1)
				branchList.push({
					peerId: verTransList[j].peerId,
					branch: branch
				});
				console.log(branch);			
			}
			count++;
		}
	}
	fs.writeFileSync("./branchList.json",JSON.stringify(branchList,undefined,2));						
}

module.exports = {createBranch};
