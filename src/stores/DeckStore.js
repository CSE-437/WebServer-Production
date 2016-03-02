import dispatcher from '../core/Dispatcher'
import DeckActions from '../actions/DeckActions';

class DeckStore{
  constructor(){
    this.bindActions(DeckActions, this.handleDeckActions);
    this.decks = [];
    this.transactions = [];
  }
  handleDeckActions(decks){
	  console.log("New decks", decks)
    this.decks = decks;
  }
  onGetDecksSuccess(decks){
	console.log("New decks", decks)
    this.decks = decks;
  }

  onGetDecksFail(err){
    console.log(err)
  }
}

export default dispatcher.createStore(DeckStore);
