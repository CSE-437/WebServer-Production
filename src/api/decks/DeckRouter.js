//Register todos with aws dynammodb.
//https://github.com/yortus/asyncawait
import Promise from 'bluebird';
import {Router} from 'express';
var Parse = require( 'parse/node');

import DeckObject, {DeckUtil} from './DeckModel';
import TransactionObject, {TransactionUtil} from '../transactions/TransactionModel';


const router = new Router();

router.get('/', async (req,res,next) =>{
  //console.log("IN get all decks")
  var query = new Parse.Query(DeckObject);
  if (req.query.keywords) {
    query.containsAll("keywords", req.query.keywords)
  }
  if (req.query.name){
    query.contains("name", req.query.name)
  }
  if (req.query.cids){
    query.containsAll("cids", req.query.cids)
  }
  if (req.query.owner){
    query.equalTo("owner", req.query.user)
  }
  if (req.query.owner){
    query.equalTo("gid", req.query.gid)
  }
  //console.log(query)
  query.find({
    success: function(results){
    //  console.log("Succssfully retrieved ", results);
      return res.status(200).send(results);
    },
    error: function(err){
      //console.log("Failed to get decks ", err);
      return res.status(400).send(err)
    },
    sessionToken: req.session.sessionToken
  });
});
//If deck exist update it. Uses session names
router.post('/', async (req,res,next) => {

  var query = new Parse.Query(DeckObject);
    if(!req.body.gid  && !req.body.did){

      return res.status(400).send({err: "Must have a did or gid"});
    }
    if (req.body.gid){
      query.equalTo("gid", req.body.gid);
    }else if(req.body.did){
      query.equalTo("gid", req.session.user.get("username")+req.body.did)
    }
    query.find({
      success: function(results){

        //console.log("here2")
        var newDeck = results[0] || new Parse.Object("Deck");
        //console.log("here4", results)
        newDeck = DeckUtil.fromRequestBody(newDeck, req.body);
        var gid = req.body.gid || req.session.user.get("username") +":"+req.body.did
        var did = Number(gid.split(":")[1]);
        newDeck.set("gid", gid);
        newDeck.set("did", did);
        newDeck.save(null, {
            success: function(deck){

          //    console.log("here3")
              return res.status(200).send(deck)
            },
            error: function(deck, error){
            //  console.log(newDeck);
              return res.status(400).send({err: error, deck: deck});
            },
            sessionToken: req.session.sessionToken
          });
      },
      error: function(err){

        return res.status(500).send({err: err, deck: {}});
      },
      sessionToken: req.session.sessionToken
    })

});
router.param('gid', async (req, res, next, gid) =>{
  req.gid = gid;
  next()
});

router.get('/:gid', async (req, res, next) => {
  var query = new Parse.Query(DeckObject);
  query.equalTo("gid", req.gid);
  query.find({
    success: function(results){
      return res.status(200).send(results);
    },
    error: function(deck, error){
      return res.status(400).send({err: error, deck: deck});
    },
    sessionToken: req.session.sessionToken
  });
});
//Expects [transactions] TODO deal with Fork
router.post('/:gid', async (req, res, next) =>{
  var current_id = req.gid
  if (!req.body.isArray && !(req.body.length>0)){
    return res.status(400).send({err:"Must send array of transactions"})
  }
  var transactions = req.body.map(function(body){
    var t = new Parse.Object("Transaction");
    return TransactionUtil.fromRequestBody(t, body);
  });
  var parsedTransactions = []
  transactions.forEach(function(t, index){
    t.set("on", current_id);
    t.set("owner", req.session.get("username"));
    t.set("localIndex", index);
    t.save(null, {
      success: function(trans){
        //TODO maintain order or not

        parsedTransactions.push({transaction: trans, error: null});
        if(parsedTransactions.length == transactions.length){
          res.status(200).send(parsedTransactions)
        }
      },
      error: function(trans, error){

        parsedTransactions.push({transaction: trans, error: error});
        if(parsedTransactions.length == transactions.length){
          res.status(400).send(parsedTransactions)
        }
      },
      sessionToken: req.session.sessionToken
    });
  });
});

export default router;
