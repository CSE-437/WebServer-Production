import dispatcher from '../core/Dispatcher';
import $ from 'jquery'

//Remember that this file runs on the client not the server
class ProfileActions{
  constructor(){
    //Each of these actiosn will become a function
    this.generateActions(
      'signUpSuccess',
      'signUpFail',
      'logInSuccess',
      'logInFail',
      'logOutSuccess',
      'logOutFail'
    );
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

  logIn(info){
    var self = this;
    $.post('/api/users/login', info)
      .done((data)=>{
        self.logInSuccess(data)
      })
      .fail((data)=>{
        self.logInFail(data)
      });
  }

  logOut(){
    var self = this;
    $.post('/api/users/logout')
      .done((data)=>{
        self.logOutSucess(data)
      })
      .fail((data)=>{
        self.logOutFail(data)
      });
  }
}

export default dispatcher.createActions(ProfileActions);
