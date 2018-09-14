const readline = require('readline');
var GeoJSON = require('geojson');

  const crypto = require('crypto');


var landfunc= function (landobj){

//const rl = readline.createInterface({
  //  input: process.stdin,
    //output: process.stdout
//});
//rl.question('Enter the coordinates (lat-long) order wise  : ', (answer) => {
  //please enter the coordinate in the a way eg. 98.1,98.2  90.2,-19.4
  //  var point={
  //   "point1":{
  //     "pointx":[94,21],
  //     "pointy":[93,21]
  // },
  // "previousId":"1321reu21"
  //  }

    var answer=[];
    //let propSymb = Object.getOwnPropertyNames(point.point1);

    //console.log(propSymb);

  
    answer.push(Object.values(landobj.point)); 
    console.log(answer[0]);  
    var previousLandId = landobj.previousId;
    if(previousLandId.length <32){
      return "Invalid previousLandId";
    }
    if(landobj.point.point1.length<4 || landobj.point.point2.length<4 || landobj.point.point3.length<4 ||landobj.point.point4.length<4){

      return "Please enter the correct coordinates";
    }
   if(answer =="" || answer == undefined  ){
    
     return console.log("please provide the correct coordinates");
    process.exit(0);
    
  }

  else{
    // var x =[];
    // for(var i in answer){

    //   x.push(answer[i]);
    // }
    //     // console.log('The given coordinates are:')
    // for(var j=0;j<x.length;j++){
   
    //  console.log(x[j]);
    // }  
    
    var data1 = answer;
    var data2 = [
    {
    polygon: [
      data1
    ],
    previousId1:previousLandId
  }];

  var output1=   GeoJSON.parse(data2, {'Polygon': 'polygon'});
//  console.log('The following are the entries given by you in json string:')
  //converting geoJson to json
  var json = JSON.stringify(output1,undefined,2);
 // console.log(json);
  const hash = crypto.createHash('sha256').update(json).digest('hex');
  return hash;

  // setTimeout(()=>{
  //   console.log('your LandID :');
  //    console.log(hash);
  // },3000);

}
}

 

module.exports={landfunc};
