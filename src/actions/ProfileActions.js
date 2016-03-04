import dispatcher from '../core/Dispatcher';
import $ from 'jquery'

//Remember that this file runs on the client not the server
class ProfileActions{
  constructor(){
    //Each of these actiosn will become a function
    this.generateActions(
      'getDecksSuccess',
      'getDecksFail',
      'signUpSuccess',
      'logInSuccess',
    );
  }

  //Directly callled by TodoPage
  //R
  getDecks(){
    //Get all todos
    $.ajax({url: '/api/Profile/all'})
      .done((data)=>{
        this.getDecksSuccess(data)
      })
      .fail((err)=>{
        this.getDecksFail(err)
      });
  }

  signUp(info){
    var self = this;
    $.post('/api/users/signup', info)
      .done((data)=>{
        self.signUpSuccess(data)
      })
      .fail((data)=>{
        self.signUpFail(data)
      });
  }
}

export default dispatcher.createActions(ProfileActions);
