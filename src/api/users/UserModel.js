import Promise from 'bluebird';
import ObjectAssign from 'object-assign';
import bcrypt from 'bcrypt-nodejs';
var LocalStrategy = require('passport-local').Strategy;

var dynamoose = require('dynamoose');

if(process.env.NODE_ENV == 'development'){
  console.log("Using local database Usermodel");
  dynamoose.local('http://localhost:8989');
}

var Schema = dynamoose.Schema;

var userSchema = new Schema({
  id:{
    type: Number,
    validate: function(v) {return v > 0;},
    hashKey: true//Alwasy have one
  },
  username: {
    type: String,
    rangeKey: true,
    index: true // name: nameLocalIndex, ProjectionType: All
  },
  decks:{
      type:[String],
      required:false,
  },
  //everything below this is authentication
  localEmail:String,
  localPassword: String,

})

var User = dynamoose.model('User', userSchema);
//Required for passport to serialize user
const UserMethods = {
  serializeUser : function(user, done){
    console.log(`IN User.serializeUser: ${arguments}`);
    done(null, user.id)
  },

  deserializeUser : function(id, done){
    console.log(`IN User.deserializeUser: ${arguments}`);
    User.get({id:id}, function(err, user){
        done(err, user);
    });
  },

  LocalStrategy : new LocalStrategy(function(email, pass, done){
    console.log(`IN User.LocalStrategy: ${arguments}`);
    User.get({localEmail:email}, function(err, user){
      if (err){
        return done(err);
      }else{
        if(user && UserMethods.validPassword(pass, user.localPassword)){
          return done(null, user);
        }else{
          return done(null, false, {
            message: 'Login Invalid'
          })
        }
      }
    });
  }),

  generateHash : function(pass){
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
  },

  validPassword : function(pass, compare){
    bcrypt.compareSync(pass, compare)
  },
//UserUtil.register(new User({username : req.body.username, localEmail: req.body.email}), req.body.password, function(err, user){
  //TODO make sure no user of same name exist and password is decent. check email
  register : function(user, password, cb){
    user.localPassword = this.generateHash(password);
    user.id = 2;
    console.log(user);
    User.create(user, function(err, u){
      cb(err, u);
    });

  }

}


export default User;
export const UserUtil = UserMethods
