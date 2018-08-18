const readline = require('readline');
var GeoJSON = require('geojson');



try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}


var lanfunc= async(callback)=>{

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the coordinates (lat-long) order wise  : ', (answer) => {
  //please enter the coordinate in the a way eg. 98.1,98.2  90.2,-19.4
   
        var previousLandId = "rqwpowhth12344";
        var chunk = answer.split(" ");
  
   if(answer =="" || answer == undefined  ){
    
     return callback("please provide the correct coordinates");
    process.exit(0);
    
  }

  
  

  else{
    var x =[];
    for(var i in chunk){

      x.push(chunk[i]);
    }
        // console.log('The given coordinates are:')
    //for(var j=0;j<x.length;j++){
   
     //console.log(x[j]);
   // }  
    var data1 = x;
    var data2 = [
    {
    polygon: [
      data1
    ],
    previousId:previousLandId
  }];

  var output1=   GeoJSON.parse(data2, {'Polygon': 'polygon'});
//  console.log('The following are the entries given by you in json string:')
  //converting geoJson to json
  var json = JSON.stringify(output1,undefined,2);
 // console.log(json);
  const hash = crypto.createHash('sha256').update(json).digest('hex');
  setTimeout(()=>{
    console.log('your LandID :');
     console.log(hash);
  },3000);

}

        rl.close();
    
});

};


module.exports={landfun};