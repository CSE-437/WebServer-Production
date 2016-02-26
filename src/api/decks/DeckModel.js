import Promise from 'bluebird';
import ObjectAssign from 'object-assign';
var dynamoose = require('dynamoose');

if(process.env.NODE_ENV == 'development'){
  console.log("Using local database deck model");
  dynamoose.local('http://localhost:8989');
}
//https://app.apiary.io/ankihub/editor
var Schema = dynamoose.Schema;

var deckSchema = new Schema({
  did:{
    type: Number,
    validate: function(v) {return v > 0;},
    hashKey: true//Alwasy have one
  },
  owner: {
    type: String,
    rangeKey: true,
    index: true // name: nameLocalIndex, ProjectionType: All
  },
  //everything below this is deck info
  desc: String,
  name: String,
  cards: [String],
  owner: Number,
  children:[String],
  subscribers:[Number],
  subscriptions:[String],
  transactions:[Object]
})

var Deck = dynamoose.model('Deck', deckSchema);


export default Deck;
export const DeckUtil = {
  GetTransactions: function(did, cb){
    Deck.get({did:did}, function(err, deck){
      cb(err, deck.transactions);
    });
  }
}
