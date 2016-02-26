var spawn = require('child_process').spawn;
var child;
export default ()=>{
  console.log("HELLO")
  child = spawn('java',[
    '-Djava.library.path=./Dynamodb/DamoDBLocal_lib',
    '-jar',
    './Dynamodb/DynamoDBLocal.jar',
    '-sharedDb', "-port", "8989"
  ]);

  child.stdout.on('data', function(chunk){
    console.log("DYNAMODB", chunk.toString())
  });

  child.stderr.on('data', function(chunk){
    console.log("DYNAMODB ERR", chunk.toString())
  });

  child.on('close', (code)=>{
    console.log(`child processs exit with code ${code}`);
  })

}
