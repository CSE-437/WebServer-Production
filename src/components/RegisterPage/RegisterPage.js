/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './RegisterPage.scss';
import withStyles from '../../decorators/withStyles';
import ProfileActions from '../../actions/ProfileActions';

const title = 'New User Registration';

import {Input} from 'react-bootstrap';
import {ButtonInput} from 'react-bootstrap';

var SignUpForm = React.createClass({
  getInitialState: function() {
      return {username:'', email:'', password:'', confirmPassword:''};
  },
  handleUsernameChange: function(e) {
      this.setState({username: e.target.value});
  },
  handleEmailChange: function(e) {
      this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
      this.setState({password: e.target.value});
  },
  handleConfirmPasswordChange: function(e) {
      this.setState({confirmPassword: e.target.value});
  },
  handleSubmit: function(e) {
      e.preventDefault();
      var username = this.state.owner.trim();
      var email = this.state.email;
      var password = this.state.password;
      var confirmPassword = this.state.confirmPassword;
      if (!username || !email || !password || password != confirmPassword) {
          return;
      }
      this.props.onCommentSubmit({owner: owner, text: text});
      this.setState({owner: '', text: ''});
  },
    render: function() {
      return (
            <div className="signUpForm">
            <form onSubmit={this.handleSubmit}>
            <Input type="text" label="Text" placeholder="Username"
             value ={this.state.username} onChange={this.handleUsernameChange}/>
            <Input type="email" label="Email Address" placeholder="Enter email"
             value={this.state.email} onChange={this.handleEmailChange}/>
            <Input type="password" label="Password"
             value={this.state.password} onChange={this.handlePasswordChange}/>
            <Input type="password" label="Confirm Password"
             value={this.state.confirmPassword}onChange={this.handleConfirmPasswordChange}/>

            <ButtonInput type="reset" value="Reset Button" />
            <ButtonInput type="submit" value="Submit Button" />
          </form>
          </div>
        );
    }
});
@withStyles(s)
class RegisterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <SignUpForm/>
        </div>
      </div>
    );
  }

}

export default RegisterPage;
