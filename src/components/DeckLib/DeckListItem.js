import React, { Component, PropTypes } from 'react';
import DeckActions from '../../actions/DeckActions';
import DeckStore from '../../stores/DeckStore';

import Link from '../Link';


import {ListGroupItem} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
class DeckListItem extends Component{

render(){
  let deck = this.props.deck
  let userUrl = "/users/"+deck.owner
  let deckUrl = "/decks/"+deck.gid
  return (
    <ListGroupItem>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <a href={userUrl} onClick={Link.handleClick}>{deck.owner}</a>
            <span>/</span>
            <a href={deckUrl} onClick={Link.handleClick}>{deck.name}</a>
          </Col>
        </Row>
      </Grid>
    </ListGroupItem>
  );
}
}
export default DeckListItem;
