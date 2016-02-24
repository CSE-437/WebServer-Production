/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';

import passport from 'passport';
import flash from 'connect-flash';

import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

var io = require('socket.io')(server);

import AWS from 'aws-sdk';
//Change region
AWS.config.update({region:'us-west-2'});

var DynamoDBStore = require('connect-dynamodb')({session: session});

const server = global.server = express();

//Configure passport
require('./config/passport')(passport);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(morgan('dev'));//log every request to console
server.use(cookieParser()); //read cookies for authentication

//Connects to the sessions table of our database
server.use(session({
  store: new DynamoDBStore({
    reapInterval:600000 //Expires every 10 minutes
  }),
  resave: true,
  saveUninitialized: true,
  secret:'ankiisloveankiislife'
}));
server.use(passport.initialize());
server.use(passport.session()); //persistant login sessions
//TODO: Figure out the best way to send req.flash() to pages
server.use(flash());//use connect-flash for flash messages stored in session.

server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
//pass passport to all api
server.use('/api/user', require('./api/users/UserRouter'));
server.use('/api/deck', require('./api/decks/DeckRouter'));
server.use('/api/todo', require('./api/todo'));
server.use('/api/content', require('./api/content'));

server.use('/api/Profile', require('./api/Profile'));

require('./auth/auth')(server, passport);
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//Instantiate Socket IO
var onlineUsers = 0;//TODO get rid of when done testing
io.sockets.on('connection', function(socket){
  onlineUsers++;

  io.sockets.emit('onlineUsers', {onlineUsers: onlineUsers});

  socket.on('disconnect', function(){
    onlineUsers--;
    io.sockets.emit('onlineUsers', {onlineUsers: onlineUsers});
  });
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
