import Promise from 'bluebird';
import ObjectAssign from 'object-assign';
var running_id = 0
var users = []

class User{
  //all users have a name, friends: array of ids, and decks: array of ids
  constructor(obj = {name: "default", friends: [], decks: []}){
    this.name = obj.name;
    this.friends = obj.friends;
    this.decks = obj.decks;
    this.id = running_id++;
  }

  update(obj){
    let name = obj.name || this.name;
    let friends = obj.friends || this.friends;
    let decks = obj.decks || this.decks;

    ObjectAssign(this, {name: name, friends: friends, decks: decks});
  }

  delete(){
    delete users[this.id]
  }

}

const populateUsers = ()=>{
  let t = [
    {
      name:"david",
      friends: [1],
      decks: [1,2,4]
    },
    {
      name:"john",
      friends: [],
      decks: [3]
    }
  ]
  return t.map((item)=>{return new User(item)})
}

users = populateUsers();

class UserModel{
  getAllUsers(){
    console.log(users)
    return users;
  }

  newUser(obj){
    user = new User();
    console.log("New User: ", user)
    users.append(user)
    return user;
  }
}

export default new UserModel();
