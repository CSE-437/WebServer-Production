import Promise from 'bluebird';
import ObjectAssign from 'object-assign';
import AWS from 'aws-sdk';
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJVMHTIZFC3SZZWSA";
AWS.config.secretAccessKey = "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";
AWS.config.region = 'us-west-2';


var s3 = new AWS.S3();


class DeckModel{
  getAllDecks(){
    return new Promise(function(resolve, reject){
      s3.listBuckets(function(err, data){
        if(err){
          console.log("Error:");
          reject({error: err});
        }else{
          for (let index in data.Buckets){
            var bucket = data.Buckets[index];
            console.log("Bucket: ", bucket.Name, ':', bucket.CreationDate);
          }
          console.log("should resolve")
          resolve(data);
        }
      })
    });

  }


}

export default new DeckModel();
