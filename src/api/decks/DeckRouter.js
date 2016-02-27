//Register todos with aws dynammodb.
//https://github.com/yortus/asyncawait
import Promise from 'bluebird';
import {Router} from 'express';

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

router.param('did', function(req, res,next,id){
  req.did = did;
  next();
});

//TODO: Get user by id
router.route('/:cid')
.get(async (req, res, next) => {
  res.status(200).send({message:"Hi"});
});

export default router;
