import React, { Component, PropTypes } from 'react';
import DeckActions from '../../actions/DeckActions';
import DeckStore from '../../stores/DeckStore';

import {ListGroup} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';

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
}
render(){
  var deckNodes = this.state.decks.map(function(deck) {
      return (
          <ListGroupItem>
            <h1>{deck.name}</h1>
            <h3>{deck.owner}</h3>
            <span>{deck.gid}</span>
          </ListGroupItem>
      );
  });
  return (
    <div class="deckList">
      {deckNodes}
    </div>
  );
}
