//Register todos with aws dynammodb.
import Promise from 'bluebird';
import {Router} from 'express';

const router = new Router();



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
