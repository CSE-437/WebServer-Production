//Register todos with aws dynammodb.
//https://github.com/yortus/asyncawait
import Promise from 'bluebird';
import {Router} from 'express';
import Parse from 'parse/node';


import DeckObject from './DeckModel';
import TransactionObject from '../transactions/TransactionModel';


const router = new Router();

router.get('/', async (req,res,next) =>{
  //console.log("IN get all decks")
  var query = new Parse.Query(DeckObject);
  query.find({
    success: function(results){
      console.log("Succssfully retrieved ", results);
      return res.status(200).send(results);
    },
    error: function(err){
      console.log("Failed to get decks ", err);
      return res.status(400).send(err)
    }
  })
  console.log('end')
});
router.post('/', async (req,res,next) => {
    var deck = DeckObject.fromRequestBody(req.body);
    if(deck.validate()){
      deck.save(null, {
        success: function(deck){
          return res.status(200).send(deck)
        },
        error: function(deck, error){
          return res.status(400).send({err: error, deck: deck});
        }
      });
    }else{
      return res.status(400).send({err: "Invalid Deck format"})
    }
});
router.param('did', async (req, res, next, did) =>{
  req.did = did;
  next()
});

router.get('/:did', async (req, res, next) => {
  var query = new Parse.Query(DeckObject);
  query.equalTo("did", req.did);
  query.find({
    success: function(results){
      return res.status(200).send(results);
    },
    error: function(deck, error){
      return res.status(400).send({err: error, deck: deck});
    }
  });
});
//Expects [transactions] TODO deal with Fork
router.post('/:did', async (req, res, next) =>{
  var current_id = req.did
  var parsedTransaction = [];
  for(var t in req.body){
    var transaction = TransactionObject.fromRequestBody(req.body);
    transaction.set("on", current_id);
    deck.save(null, {
      success: function(trans){
        //TODO maintain order
        parsedTransaction.push(trans);
      },
      error: function(trans, error){
        return res.status(400).send({err: error, "parsedTransactions": parsedTransactions, "failingTransaction": trans});
      }
    });

      return res.status(200).send(transactions)
  }
});

export default router;
