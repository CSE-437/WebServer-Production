export default {
  UserToObject: function(user){
    return {
      username: user.get("username"),
      objectId: user.get("objectId"),
      sessionToken: user.get("sessionToken")
    }
  }
}
