//Register todos with aws dynammodb.
import Promise from 'bluebird';
import {Router} from 'express';
import UserModel from './UserModel';

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
  var users;
  console.log(UserModel)
  users = await UserModel.getAllUsers()
  console.log(users)
  res.status(200).send(users)
  return;
});

router.param('userid', function(req, res,next,id){
  req.userid = id;
  next();
});

//TODO: Get user by id
router.route('/:userid')
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
