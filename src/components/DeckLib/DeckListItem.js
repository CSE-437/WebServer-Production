import React, { Component, PropTypes } from 'react';
import DeckActions from '../../actions/DeckActions';
import DeckStore from '../../stores/DeckStore';

import Link from '../Link';


import {ListGroupItem} from 'react-bootstrap';
import {Button, Glyphicon} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';

class DeckListItem extends Component{

render(){
  let deck = this.props.deck
  let userUrl = "/users/"+deck.owner
  let deckUrl = "/decks/"+deck.gid
  let title = (
    <h4><Glyphicon glyph="align-justify"/>
    <a href={userUrl} onClick={Link.handleClick}>{deck.owner}</a>
      <span>/</span>
      <a href={deckUrl} onClick={Link.handleClick}>{deck.name}</a>
    </h4>
  );
  console.log(deck)
  let subscribers = (
    <span>{deck.subscribers.length} Subscribers</span>
  )
  let cards = (
    <span>{deck.cids.length} Cards</span>
  )
  return (
    <Panel header={title}>
      <blockquote>{deck.desc}</blockquote>
      {subscribers}
      {cards}
    </Panel>
  );
}
}
export default DeckListItem;
