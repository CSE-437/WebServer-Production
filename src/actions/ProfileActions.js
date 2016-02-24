import dispatcher from '../core/Dispatcher';
import $ from 'jQuery'

//Remember that this file runs on the client not the server
class ProfileActions{
  constructor(){
    //Each of these actiosn will become a function
    this.generateActions(
      'getDecksSuccess',
      'getDecksFail'
    );
    console.log(this)
  }

  //Directly callled by TodoPage
  //R
  getDecks(){
    //Get all todos
    console.log(this)
    $.ajax({url: '/api/Profile/all'})
      .done((data)=>{
        this.getDecksSuccess(data)
      })
      .fail((err)=>{
        this.getDecksFail(err)
      });
  }
}

export default dispatcher.createActions(ProfileActions);
