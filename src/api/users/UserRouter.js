//Register todos with aws dynammodb.
//https://github.com/yortus/asyncawait
import Promise from 'bluebird';
import {Router} from 'express';
import Parse from 'parse/node';


import TransactionObject from '../transactions/TransactionModel';

const router = new Router();

router.get('/', async (req,res,next) =>{
  //console.log("IN get all decks")
  var query = new Parse.Query(UserObject);
  if(req.query.username){

    query.contains("username", req.query.username)
  }
  query.find({
    success: function(results){
      console.log("Succssfully retrieved ", results);
      return res.status(200).send(results);
    },
    error: function(err){
      console.log("Failed to get decks ", err);
      return res.status(400).send(err)
    }
  });
});
router.post('/signup', async (req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;

    if(username && password){
      var newUser = new Parse.User();
      newUser.set("username", username);
      newUser.set("password", password);
      newUser.set("subscriptions", []);

      newUser.signUp(null,{
        success: function(user){
          res.status(200).send({err: null, user: user});
        },
        error: function(user, error){
          res.status(400).send({err: error, user: user})
        }
      });
    }else{
      return res.status(400).send({err: {msg: "Need username and password"}});
    }

});

router.post('/login', async (req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;

    if(username && password){
      Parse.User.logIn(null,{
        success: function(user){
          res.status(200).send({err: null, user: user});
        },
        error: function(user, error){
          res.status(400).send({err: error, user: user})
        }
      });
    }else{
      return res.status(400).send({err: {msg: "Need username and password"}});
    }

});
router.param('username', async (req, res, next, username) =>{
  req.username = username;
  next()
});

router.get('/:username', async (req, res, next) => {
  var query = new Parse.Query(Parse.User);
  query.equalTo("username", req.username);
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
router.post('/:username', async (req, res, next) =>{
  var current_id = req.username
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
