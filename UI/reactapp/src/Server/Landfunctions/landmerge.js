
var land1 = [
  	{
  		latitude:"1",
   		longitude:"1"
	},
	{
		latitude:"1.5",
		longitude:"1"
	},
	{
		latitude:"1",
		longitude:"2"
	},
	{
		latitude:"1.5",
		longitude:"2"
	}
];





var land2 = [
{
	latitude:"2",
	longitude:"2"
},
{
	latitude:"1.5",
	longitude:"1"
},
{
	latitude:"2",
	longitude:"2"
},
{
	latitude:"2",
	longitude:"1"
}


];

//var landmerge = (land1,land2)=>{

var finalArray = land1.map (function(obj){
	return obj.latitude;
});

var anotherArray = land1.map(function(lan){
	return lan.longitude;

});

var outputArray =[];
var len = finalArray.length;

for(var i=0 ;i<len ;i++){
	outputArray.push([finalArray[i],anotherArray[i]]);
}


var finalArray1 = land2.map (function(obj){
	return obj.latitude;
});

var anotherArray1 = land2.map(function(lan){
	return lan.longitude;

});

var otherArray =[];
var len1 = finalArray1.length;

for(var i=0 ;i<len1 ;i++){
	otherArray.push([finalArray1[i],anotherArray1[i]]);
}

var arr = [];
var flag = 0;


  for(var i=0;i<len;i++){
  	for(var j=0;j<len1;j++){
  		if(outputArray[i][0]==otherArray[j][0]  && outputArray[i][1]==otherArray[j][1]){

  			flag=flag+1;
  			arr.push(i);

  		
  	}
  }
}


if(flag>=1){
	for(var k=0;k<arr.length;k++){
	  outputArray.splice(arr[k]);
}

	var final = outputArray.concat(otherArray);
	
	

	 console.log("both land merged");
	console.log("the coordinates of the merged land are :")
	return final;
	
}
else{
	return console.log("These lands cannot be merged");
}
//}