
const async = require("async");
const fs  = require("fs");

const {blockMaker} = require("./blockMaker");

var flag = true;
async.whilst(
	function () {return true;},
	function (callback){
		if(new Date().getMinutes() == 3){
			flag = true
		}

		if(new Date().getMinutes() === 4 && new Date().getSeconds() === 0 && flag){
			setTimeout(callback, 1000);
			blockMaker((reply)=>{
				console.log(reply);
				fs.writeFileSync("./clients/GovernmentNode/block.json",JSON.stringify(reply,undefined,2));
			});
    		flag = false; 
		}
		else{
			setTimeout(callback, 1000);
		}
	}
)
