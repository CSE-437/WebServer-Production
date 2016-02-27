import dispatcher from '../core/Dispatcher'
import DeckActions from '../actions/DeckActions';

class DeckStore{
  constructor(){
    this.bindActions(DeckActions);
    this.decks = [];
    this.transactions = [];
  }

  onGetDecksSuccess(decks){
    this.decks = decks;
  }

  onGetDecksFail(err){
    console.log(err)
  }
}

export default dispatcher.createStore(DeckStore);
