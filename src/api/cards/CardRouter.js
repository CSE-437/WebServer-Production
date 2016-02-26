//Register todos with aws dynammodb.
//https://github.com/yortus/asyncawait
import Promise from 'bluebird';
import {Router} from 'express';
import Card, {CardUtil} from './CardModel';

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


router.get('*', async(req, res,next)=>{
    res.status(200).send("hi");
})
.post('*', async(req, res,next)=>{
    res.status(200).send("hi");
})

router.param('cid', function(req, res,next,id){
  req.cid = id;
  next();
});

//TODO: Get user by id
router.route('/:cid')
.get(async (req, res, next) => {
  res.status(200).send({message:"Hi"});
})
//.put()
//.delete()

router.post('/', async(req, res, next)=>{
  console.log(req)
  res.status(200).send(req);
})
//TODO UPDATE PUT'/:userid'
//TODO create PUT'/:userid'
//TODO delete DELETE '/:userid'

export default router;
