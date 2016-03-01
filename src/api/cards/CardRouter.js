//Register todos with aws dynammodb.
//https://github.com/yortus/asyncawait
import Promise from 'bluebird';
import {Router} from 'express';
import Parse from 'parse/node';


import CardObject from './CardModel';
import TransactionObject from '../transactions/TransactionModel';


const router = new Router();

router.get('/', async (req,res,next) =>{
  //console.log("IN get all decks")
  var query = new Parse.Query(CardObject);
  if (req.query.keywords) {
    query.containsAll("keywords", req.query.keywords)
  }
  if (req.query.tags) {
    query.containsAll("keywords", req.query.tags)
  }
  if (req.query.notes) {
    query.containsAll("keywords", req.query.notes)
  }
  if (req.query.did){
    query.contains("cid", req.query.did)
  }
  if (req.query.username){
    query.contains("cid", req.query.username)
  }
  query.find({
    success: function(results){
      console.log("Succssfully retrieved ", results);
      return res.status(200).send(results);
    },
    error: function(err){
      console.log("Failed to get cards ", err);
      return res.status(400).send(err)
    }
  });
});
router.post('/', async (req,res,next) => {
    var card = CardObject.fromRequestBody(req.body);
    card.save(null, {
        success: function(newCard){
          return res.status(200).send(newCard)
        },
        error: function(newCard, error){
          return res.status(400).send({err: error, card: newCard});
        }
      });
});
router.param('cid', async (req, res, next, did) =>{
  req.cid = cid;
  next()
});
router.get('/:cid', async (req, res, next) => {
  var query = new Parse.Query(CardObject);
  query.equalTo("cid", req.cid);
  query.find({
    success: function(results){
      return res.status(200).send(results);
    },
    error: function(card, error){
      return res.status(400).send({err: error, card: card});
    }
  });
});
//Expects [transactions] TODO deal with Fork
router.post('/:cid', async (req, res, next) =>{
  var current_id = req.cid
  var parsedTransaction = [];
  for(var t in req.body){
    var transaction = TransactionObject.fromRequestBody(req.body);
    transaction.set("on", current_id);
    transaction.save(null, {
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
