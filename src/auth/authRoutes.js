//Register todos with aws dynammodb.
import Promise from 'bluebird';
import {Router} from 'express';
import passport from 'passport';
import User, {UserUtil} from '../api/users/UserModel';

const router = new Router();

router.post('/register', function(req, res){
  UserUtil.register({username : req.body.username, localEmail: req.body.email}, req.body.password, function(err, user){
    if (err){
      return res.status(500).send(err)
    }

    passport.authenticate('local')(req, res, function(){
      res.status(200).send('authenticated');
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res){
  res.status(200).send('authenticated');
});

router.get('/logout', function(req, res){
  req.logout();
  res.status(200).send('logged out')
});
export default router;
