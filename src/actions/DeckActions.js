import dispatcher from '../core/Dispatcher';
import $ from 'jquery'

class DeckActions{
  constructor(){
    this.generateActions(
      'getAllDecksSuccess',
      'getAllDecksFail',
      'uploadDeckSuccess',
      'uploadDeckFail',
      'getDeckSuccess',
      'getDeckFail',
      'postTransactionsSuccess',
      'postTransactionsFail'
    )
  }
  getAllDecks(){
    $.get('/api/decks')
      .done((data)=>{
        this.actions.getAllDecksSuccess(data)
      })
      .fail((data)=>{
        this.actions.getAllDecksFail(data)
      });
  }
  uploadDeck(deck){
    $.post('/api/decks', decks)
      .done((data)=>{
        this.actions.uploadDeckSuccess(data)
      })
      .fail((data)=>{
        this.actions.uploadDeckFail(data)
      });
  }
  getDeck(did){
    $.get(`/api/decks/${did}`, )
      .done((data)=>{
        this.actions.getDeckSuccess(data)
      })
      .fail((data)=>{
        this.actions.getDeckFail(data)
      });
  }
  postTransactions(did, transactions){
    $.post(`/api/decks/${did}`, transactions)
      .done((data)=>{
        this.actions.postTransactionsSuccess(data)
      })
      .fail((data)=>{
        this.actions.postTransactionsFail(data)
      });
  }
}

export default dispatcher.createActions(DeckActions);
