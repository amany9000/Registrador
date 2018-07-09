
var classifyPoint = require("robust-point-in-polygon");

var polygon = [ [ '1', '1' ], [ '1', '2' ], [ '2', '2' ], [ '2', '1' ],['2','0'] ];


var latlong=[
	{
		latitude:"1.5",
		longitude:"1.5"
	},
	{
		latitude:"1",
		longitude:"1"
	},
	{
		latitude:"1.3",
		longitude:"1.4"
	},
	{
		latitude:"1",
		longitude:"1"
	}
	


];

 //function landcomp(polygon,latlong){

var finalArray = latlong.map (function(obj){
	return obj.latitude;
})

var anotherArray = latlong.map(function(lan){
	return lan.longitude;

})

var outputArray =[];
var len = finalArray.length;

for(var i=0 ;i<len ;i++){
	outputArray.push([finalArray[i],anotherArray[i]]);
}


//console.log(finalArray);
//console.log(anotherArray);
//console.log(outputArray[0]);

var flag =0;
var count = outputArray.length;
for(let i=0 ;i< count;i++){
	var x = latlong[i]
	var output=classifyPoint(polygon,outputArray[i]);
	//console.log(output);
	if(output == -1|| output == 0){

		flag = flag+1;
	}

}


if(flag == count ){
	 return console.log('The provide land-coordinates are inside the polygon');
}

else{
	return console.log('These coordinates are not valid');
}
//}