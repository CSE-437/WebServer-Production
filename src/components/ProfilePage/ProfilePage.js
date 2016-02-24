/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './ProfilePage.scss';
import withStyles from '../../decorators/withStyles';
import ProfileStore from '../../stores/ProfileStore';
import ProfileActions from '../../actions/ProfileActions';
import Link from '../Link';

const title = 'Profile';

@withStyles(s)
class ProfilePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    ProfileActions.getDecks();
  }

  componentWillUnmount(){
    ProfileStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render() {
    let decks = this.state.profiles.map((deck) =>{
      return (
        <li key={deck.id}>
          <a href={'/profile/'+deck.id} onClick={Link.handleClick}>{deck.name}</a>
          <p>{deck.description}</p>
        </li>
      )
    });
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          {decks}
        </div>
      </div>
    );
  }

}

export default ProfilePage;
