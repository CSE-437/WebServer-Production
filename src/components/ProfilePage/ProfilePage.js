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
import DeckStore from '../../stores/DeckStore';
import DeckActions from '../../actions/DeckActions';
import Link from '../Link';


// tutorial10.js
var DeckList = React.createClass({

    render: function() {
        var deckNodes = this.props.data.map(function(deck) {
            return (
                // <Deck
                // key = {deck.name}
                // name = {deck.name}
                // desc = {deck.desc}
                // owner={deck.owner}
                // cids = {deck.cids}
                // children = {deck.children}
                // subscribers = {deck.subscribers}
                // >
                <Deck
                did = {deck.did}
                name = {deck.name}
                //keywords = {deck.keywords}
                //desc = {deck.desc}
                //cids = {deck.cids}
                //newCards = {deck.newCards}
                owner ={deck.owner}
                //ispublic = {deck.ispublic}
                //children = {deck.children}
                //subscribers = {deck.subscribers}
                >
                </Deck>
            );
        });
        return (
            <div className="commentList">
            {deckNodes}
            </div>
        );
    }
});

// tutorial16.js
var DeckForm = React.createClass({
    getInitialState: function() {
        return {owner: '', text: ''};
    },
    handleownerChange: function(e) {
        this.setState({owner: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var owner = this.state.owner.trim();
        var text = this.state.text.trim();
        if (!text || !owner) {
            return;
        }
        this.props.onCommentSubmit({owner: owner, text: text});
        this.setState({owner: '', text: ''});
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
            <input
            type="text"
            placeholder="Your name"
            value={this.state.owner}
            onChange={this.handleownerChange}
            />
            <input
            type="text"
            placeholder="Say something..."
            value={this.state.deck}
            onChange={this.handleTextChange}
            />
            <input type="submit" value="Post" />
            </form>
        );
    }
});

// tutorial7.js
var Deck = React.createClass({
    render: function() {
        return (
            <div className="deck">
                  <div className="name">
                Name: {this.props.name}
                </div>



                <div className="owner">
                Owner: {this.props.owner}
                </div>


            </div>
        );
    }
});


var Nav = React.createClass({
    render: function() {
        return (
            <a
            className="nav"
            url={this.props.url}
            onClick={this.handleClick}>{this.props.text}</a>
        );
    },
    handleClick: function(event) {
        this.props.update(this.props.url);
    },
});

// tutorial14.js
class DeckBox extends Component{

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
	};

	 //Constroctor for class.
	 //REMEBER props and state are two different things.
	 //databinding uses props.
	 constructor(props){
	   super(props);
	   this.state = DeckStore.getState();
	   //need to use bind so that the this variable for onChange
	   //refers to this DeckPage object not the function
	   this.onChange = this.onChange.bind(this);
	 }

	 componentWillMount() {
		this.context.onSetTitle("Profile Page");
	}

	 //Alwasy call
	 componentDidMount(){
	   //makes the DeckStore call the onchange function whenever it cnanges.
	   //This is why we had to use bind
	   DeckStore.listen(this.onChange);
	   //As soon as it is poling for data get data
	   DeckActions.getAllDecks();
	 }

	 componentWillUnmount(){
	   //remove event listener
	   DeckStore.unlisten(this.onChange);
	 }

	 //simply sets the state whenever the Deck store changes
	 onChange(state){
	   this.setState(state);
	   console.log("Getting new State", this.getState)
	 }
    loadCommentsFromServer() {
        $.ajax({
            url: this.state.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
    }
    handleUpdate(_url) {

        $.ajax({
            url: _url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data, url: _url});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(_url, status, err.toString());
            }.bind(this)
        });
    }
    handleCommentSubmit(comment) {
        var comments = this.state.data;
        // Optimistically set an id on the new comment that will be replaced
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments, url: this.state.url});

        $.ajax({
            url: this.state.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({data: comments});
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
    }

	render() {
		console.log(this.state.decks)
        return (
            <div className="commentBox">



                <DeckList data={this.state.decks} />

            </div>
        );
    }
}

// <DeckForm onCommentSubmit={this.handleCommentSubmit} />

export default DeckBox;
