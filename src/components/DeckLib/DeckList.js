import React, { Component, PropTypes } from 'react';
import DeckActions from '../../actions/DeckActions';
import DeckStore from '../../stores/DeckStore';

import {ListGroup} from 'react-bootstrap';
import DeckListItem from './DeckListItem';

class DeckList extends Component{
  constructor(props){
    super(props);
    this.state = DeckStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    DeckStore.listen(this.onChange);
    //Todo pass properties
    DeckActions.getAllDecks({limit:30});
  }

  componentWillUnmount(){
    DeckStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

render(){
  let deckNodes = this.state.decks.map(function(deck) {
      return (
        <DeckListItem deck={deck}/>
      );
  });
  return (
    <div class="deckList">
      {deckNodes}
    </div>
  );
}
}
export default DeckList;
