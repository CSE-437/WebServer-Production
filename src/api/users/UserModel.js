import Promise from 'bluebird';
import ObjectAssign from 'object-assign';
var dynamoose = require('dynamoose');

var Schema = dynamoose.Schema;

var userSchema = new Schema({
  id:{
    type: Number,
    validate: function(v) {return v > 0;},
    hashKey: true//Alwasy have one
  },
  name: {
    type: String,
    rangeKey: true,
    index: true // name: nameLocalIndex, ProjectionType: All
  },
  localEmail: String,
  localPassword: String,
  facebookId : String,
  facebookToken : String,
  facebookEmail : String,
  facebookName : String,
  twitterId : String,
  twitterToken : String,
  twitterDisplayName : String,
  twitterUserName : String,
  googleId : String,
  googleToken : String,
  googleEmail : String,
  googleName : String

})

var User = dynamoose.model('User', userSchema);


export default User;
export const UserUtil = {
  generateHash: function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  validPassword: function(password){
    return bcrypt.compareSync(password, this.local.password);
  }
}
