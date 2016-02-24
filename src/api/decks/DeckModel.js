import Promise from 'bluebird';
import ObjectAssign from 'object-assign';
import AWS from 'aws-sdk';
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
  //TODO fill in
  getDeckById(){

  }

  //TODO fill in
  uploadDeck(){

  }

}

export default new DeckModel();
