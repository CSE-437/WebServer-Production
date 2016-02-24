//everything for auth locally
import {Strategy as LocalStrategy} from 'passport-local';

import User, {UserUtil} from '../api/users/UserModel'

export default function(passport){
  // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
   passport.serializeUser(function(user, done){
     done(null, user.id);
   });

   //Deserialize user
   passport.deserializeUser(function(id, user){
     UserModel.findById(id, function(err, user){
       done(err, user)
     })
   });

   // =========================================================================
   // LOCAL SIGNUP ============================================================
   // =========================================================================
   // we are using named strategies since we have one for login and one for signup
   // by default, if there was no name, it would just be called 'local'

   passport.use('local-signup', new LocalStrategy({
     // by default, local strategy uses username and password
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback: true
   },function(req, email, password, done){
     //asynchrounous
     //User.findOne wont fire unless data is sent back.

     process.nextTick(function(){

       //Find a suer whose email is the same as forms email.
       User.get({'localEmail': email}, function(err, user){
         // return on error
         if(err)
          return done(err);

        //check to see if there's already a user with that email.
        if (user){
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }else{

          //if no user with that email
          //set users local credentials.
          password = UserUtil.generateHash(password);

          User.create({
            localImail: email,
            localPassword : password
          }, function(err, user){
            if(err)
              throw err;
            return done(null, user)
          })

        }
       })
     })
   }))

   // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done){
      // find a user whose email is the same as the forms email
      //We are checking to see if the user trying to login already exists.
      User.get({'localEmail' : email}, function(err, user){
        if (err)
          return done(err);

        //return message if no user is found.
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found'));

        //if the user is found but password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        return done(null, user);
      });
    }));
};
