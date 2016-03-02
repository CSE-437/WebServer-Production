
  import Promise from 'bluebird';
  import {Router} from 'express';
  var Parse = require( 'parse/node');

  import CardObject, {CardUtil} from './CardModel';
  import TransactionObject, {TransactionUtil} from '../transactions/TransactionModel';


  const router = new Router();

  router.get('/', async (req,res,next) =>{
    //console.log("IN get all Cards")
    if (req.query.keywords) {
      query.containsAll("keywords", req.query.keywords)
    }
    if (req.query.tags){
      query.contains("tags", req.query.tags)
    }
    if (req.query.notes){
      query.containsAll("notes", req.query.notes)
    }
    if (req.params.cid){
      query.equalTo("cid", req.query.cid)
    }

    if (req.params.username){
      query.equalTo("cid", req.query.username)
    }
    console.log(query)
    query.find({
      success: function(results){
        console.log("Succssfully retrieved ", results);
        return res.status(200).send(results);
      },
      error: function(err){
        console.log("Failed to get Cards ", err);
        return res.status(400).send(err)
      },
      sessionToken: req.session.sessionToken
    });
  });
  //Todo check for username
  router.post('/', async (req,res,next) => {

      var query = new Parse.Query(CardObject);
      if(!req.body.gid && !req.body.did){

        return res.status(400).send({err: "Must have a did or gid"});
      }
      if (req.body.gid){
        query.equalTo("gid", req.body.gid);
      }
      if (req.body.did){
        query.equalTo("did", req.body.did);
      }
      console.log("here1")
      query.find({
        success: function(results){

          console.log("here2")
          var newCard = results[0] || new Parse.Object("Card");
          console.log("here4", results)
          newCard = CardUtil.fromRequestBody(newCard, req.body);
          newCard.save(null, {
              success: function(Card){

                console.log("here3")
                return res.status(200).send(Card)
              },
              error: function(Card, error){
                console.log(newCard);
                return res.status(400).send({err: error, Card: Card});
              },
              sessionToken: req.session.sessionToken
            });
        },
        error: function(err){

          return res.status(400).send({err: err, Card: {}});
        },
        sessionToken: req.session.sessionToken
      })

  });
  router.param('gid', async (req, res, next, gid) =>{
    req.gid = gid;
    next()
  });

  router.get('/:gid', async (req, res, next) => {
    var query = new Parse.Query(CardObject);
    query.equalTo("gid", req.gid);
    query.find({
      success: function(results){
        return res.status(200).send(results);
      },
      error: function(Card, error){
        return res.status(400).send({err: error, Card: Card});
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
    console.log("here1")
    var transactions = req.body.map(function(body){
      console.log("here2")
      var t = new Parse.Object("Transaction");
      console.log("here3")
      return TransactionUtil.fromRequestBody(t, body);
    });
    console.log("here4")
    var parsedTransactions = []
    transactions.forEach(function(t){
      console.log("here5")
      t.set("on", current_id);
      t.save(null, {
        success: function(trans){
          //TODO maintain order

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
