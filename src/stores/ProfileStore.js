import dispatcher from '../core/Dispatcher'
import ProfileActions from '../actions/ProfileActions';

//Remember that ever component gets it's own store
class ProfileStore{
  constructor(){
    this.bindActions(ProfileActions)
    this.decks = []
  }
  //Notice the naming scheme. Alt expects hte functions to be named on
  //followed by Actions
  onGetDecksSuccess(data){
    this.decks = data
  }

  onGetDecksFail(err){
    //use toastr library to have popup error
    toastr.error(data.message)
  }
}

export default dispatcher.createStore(ProfileStore);
