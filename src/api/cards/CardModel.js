import Promise from 'bluebird';
import ObjectAssign from 'object-assign';
var dynamoose = require('dynamoose');

if(process.env.NODE_ENV == 'development'){
  console.log("Using local database cardmodel");
  dynamoose.local('http://localhost:8989');
}
//https://app.apiary.io/ankihub/editor
var Schema = dynamoose.Schema;

var cardSchema = new Schema({
  cid:{
    type: Number,
    validate: function(v) {return v > 0;},
    hashKey: true//Alwasy have one
  },
  owner: {
    type: String,
    rangeKey: true,
    index: true // name: nameLocalIndex, ProjectionType: All
  },
  did:{
    type: Number,
    index:{
      global: true,
      rangeKey: 'owner',
      name: 'deckIndex',
      project: true, //ProjectionType: ALL
    }
  },
  //everything below this is deck info
  front: String,
  back: String,
  tags: [String],
  notes: [String],
  transactions:[Object]

})

var Card = dynamoose.model('Card', cardSchema);


export default Card;
export const CardUtil = {
  GetTransactions: function(cid, cb){
    Card.get({cid:cid}, function(err, card){
      cb(err, card.transactions);
    });
  }
}
