//Register todos with aws dynammodb.
//https://github.com/yortus/asyncawait
import Promise from 'bluebird';
import {Router} from 'express';
import DeckModel from './DeckModel';

var async = require('asyncawait/async');
var await = require('asyncawait/await');

const router = new Router();

//Authentication middleware
router.use( async(req,res,next)=>{

  //TODO replace this with user authentication
  if(true){
    next()
  }else{
    res.status(403).send({error:"Not authenticated"});
  }
});


router.get('/all', async(req, res,next)=>{
  DeckModel.getAllDecks().then(function(success, err){
      res.status(200).send(success);

  }, function(err){
    res.status(500).send(err);
  });
});

router.param('deckid', function(req, res,next,id){
  req.deckid = id;
  next();
});

//TODO: Get user by id
router.route('/:deckid')
.get(async (req, res, next) => {
  try {
    var userid = req.userid;
    res.status(200).send({message:"Hi"});

  } catch (err) {
    next(err);
  }
  return;
})
//.put()
//.delete()

//TODO UPDATE PUT'/:userid'
//TODO create PUT'/:userid'
//TODO delete DELETE '/:userid'

export default router;
