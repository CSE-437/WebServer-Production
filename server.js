require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  var _this2 = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(1);
  
  var _path = __webpack_require__(2);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDomServer = __webpack_require__(5);
  
  var _reactDomServer2 = _interopRequireDefault(_reactDomServer);
  
  var _routes = __webpack_require__(6);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _componentsHtml = __webpack_require__(85);
  
  var _componentsHtml2 = _interopRequireDefault(_componentsHtml);
  
  var _assets = __webpack_require__(86);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(14);
  
  var _morgan = __webpack_require__(87);
  
  var _morgan2 = _interopRequireDefault(_morgan);
  
  var _cookieParser = __webpack_require__(88);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(89);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressSession = __webpack_require__(90);
  
  var _expressSession2 = _interopRequireDefault(_expressSession);
  
  var _parseNode = __webpack_require__(91);
  
  var _parseNode2 = _interopRequireDefault(_parseNode);
  
  var _apiUsersUserUtil = __webpack_require__(92);
  
  var _apiUsersUserUtil2 = _interopRequireDefault(_apiUsersUserUtil);
  
  var ParseStore = __webpack_require__(93)(_expressSession2['default']);
  
  _parseNode2['default'].initialize(process.env.APP_ID || "AnkiHubParse");
  _parseNode2['default'].serverURL = process.env.SERVER_URL || "https://ankihubparse.herokuapp.com/parse";
  
  var io = __webpack_require__(94)(server);
  
  var server = global.server = (0, _express2['default'])();
  
  //Configure sessions
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use((0, _morgan2['default'])('dev')); //log every request to console
  server.use((0, _cookieParser2['default'])()); //read cookies for authentication
  server.use(_bodyParser2['default'].json({ limit: '50mb' }));
  server.use(_bodyParser2['default'].urlencoded({ limit: '50mb', extended: true }));
  //Connects to the sessions table of our database
  server.use((0, _expressSession2['default'])({
    secret: process.env.SESSION_SECRET || 'ankilove',
    store: new ParseStore({
      client: _parseNode2['default']
    }),
    resave: true,
    saveUninitialized: true
  }));
  
  server.use(function (req, res, next) {
    if (!req.session.user || !req.session.sessionToken) {
      _parseNode2['default'].User.logIn("Fluffluff", "password", {
        success: function success(user) {
          console.log('loged in');
          req.session.user = _apiUsersUserUtil2['default'].UserToObject(user);
          req.session.sessionToken = user.get("sessionToken");
  
          next();
        }, error: function error(u, _error) {
          var user = new _parseNode2['default'].User();
          user.set("username", "Fluffluff");
          user.set("password", "password");
  
          user.signUp(null, {
            success: function success(user) {
              req.session.user = user;
              req.session.sessionToken = user.get("sessionToken");
              next();
            }
          });
        }
  
      });
    } else {
      console.log;
      next();
    }
  });
  
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/api/users', __webpack_require__(95));
  server.use('/api/decks', __webpack_require__(98));
  server.use('/api/cards', __webpack_require__(100));
  server.use('/api/todo', __webpack_require__(102));
  server.use('/api/content', __webpack_require__(103));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  
  server.get('*', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      var _this = this;
  
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap((function callee$1$0() {
            var statusCode, data, css, context, html;
            return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  statusCode = 200;
                  data = { title: '', description: '', css: '', body: '', entry: _assets2['default'].main.js };
                  css = [];
                  context = {
                    insertCss: function insertCss(styles) {
                      return css.push(styles._getCss());
                    },
                    onSetTitle: function onSetTitle(value) {
                      return data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      return statusCode = 404;
                    }
                  };
                  context$2$0.next = 6;
                  return regeneratorRuntime.awrap(_routes2['default'].dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                    data.body = _reactDomServer2['default'].renderToString(component);
                    data.css = css.join('');
                  }));
  
                case 6:
                  html = _reactDomServer2['default'].renderToStaticMarkup(_react2['default'].createElement(_componentsHtml2['default'], data));
  
                  res.status(statusCode).send('<!doctype html>\n' + html);
  
                case 8:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this);
          })());
  
        case 3:
          context$1$0.next = 8;
          break;
  
        case 5:
          context$1$0.prev = 5;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this2, [[0, 5]]);
  });
  
  //Instantiate Socket IO
  var onlineUsers = 0; //TODO get rid of when done testing
  io.sockets.on('connection', function (socket) {
    onlineUsers++;
  
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  
    socket.on('disconnect', function () {
      onlineUsers--;
      io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    });
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-core/polyfill");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRoutingSrcRouter = __webpack_require__(7);
  
  var _reactRoutingSrcRouter2 = _interopRequireDefault(_reactRoutingSrcRouter);
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _componentsApp = __webpack_require__(15);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _componentsContentPage = __webpack_require__(43);
  
  var _componentsContentPage2 = _interopRequireDefault(_componentsContentPage);
  
  var _componentsContactPage = __webpack_require__(46);
  
  var _componentsContactPage2 = _interopRequireDefault(_componentsContactPage);
  
  var _componentsTodoPage = __webpack_require__(49);
  
  var _componentsTodoPage2 = _interopRequireDefault(_componentsTodoPage);
  
  var _componentsDeckPage = __webpack_require__(57);
  
  var _componentsDeckPage2 = _interopRequireDefault(_componentsDeckPage);
  
  var _componentsLoginPage = __webpack_require__(64);
  
  var _componentsLoginPage2 = _interopRequireDefault(_componentsLoginPage);
  
  var _componentsRegisterPage = __webpack_require__(67);
  
  var _componentsRegisterPage2 = _interopRequireDefault(_componentsRegisterPage);
  
  var _componentsNotFoundPage = __webpack_require__(71);
  
  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);
  
  var _componentsErrorPage = __webpack_require__(74);
  
  var _componentsErrorPage2 = _interopRequireDefault(_componentsErrorPage);
  
  //import HomePage from './components/HomePage';
  
  var _componentsProfilePage = __webpack_require__(77);
  
  var _componentsProfilePage2 = _interopRequireDefault(_componentsProfilePage);
  
  var _componentsHomePageHomePageJs = __webpack_require__(80);
  
  var _componentsHomePageHomePageJs2 = _interopRequireDefault(_componentsHomePageHomePageJs);
  
  /*
  Use a router from react-routing project.
  https://github.com/kriasoft/react-routing
  */
  var router = new _reactRoutingSrcRouter2['default'](function (on) {
    /*
    on('path', function) calls the function when ever the passed path matches.
    */
    on('*', function callee$1$0(state, next) {
      var component;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(next());
  
          case 2:
            component = context$2$0.sent;
            return context$2$0.abrupt('return', component && _react2['default'].createElement(
              _componentsApp2['default'],
              { context: state.context },
              component
            ));
  
          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
    //Show contact page
    on('/contact', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsContactPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
    //show login page. TODO Implement
    on('/login', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsLoginPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
    //show register page.
    on('/register', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsRegisterPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
    //show register page.
    on('/decks', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsDeckPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
    //show todo page
    on('/Profile', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsProfilePage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
    //
    on('/home', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsHomePageHomePageJs2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('*', function callee$1$0(state) {
      var response, content;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/content?path=' + state.path));
  
          case 2:
            response = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(response.json());
  
          case 5:
            content = context$2$0.sent;
            return context$2$0.abrupt('return', content && _react2['default'].createElement(_componentsContentPage2['default'], content));
  
          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
    //Shows error pages. Custome 404 pages.
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsNotFoundPage2['default'], null)
      ) : _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsErrorPage2['default'], null)
      );
    });
  });
  
  //Whenever someoene calls require(routes.js) they will get this function
  exports['default'] = router;
  module.exports = exports['default'];

  /*
  This actual blocks this function until the next one returns.
  Ex: If path was /contact, it would block here, wait for the
  function that passes the ContactPage to return, and resume.
  THIS WAITS FOR MULTIPLE CHILD COMPONENTS
  */

  //This syntacts checks to make sure the component isn't nil, and
  //Returns the <App context={state.context}>{component}</App>
  //Equivilent to return (component)? nil : <App context={state.context}>{component}</App>;

  //Gets the api info for that content

  //Returns the content page. This content page will be inside the app
  //due to the await next(); statement in the first on

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _Route = __webpack_require__(8);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  var emptyFunction = function emptyFunction() {};
  
  var Router = (function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
  
    function Router(initialize) {
      _classCallCheck(this, Router);
  
      this.routes = [];
      this.events = Object.create(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
    _createClass(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2['default'](path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(state, cb) {
        var routes, handlers, value, result, done, next;
        return regeneratorRuntime.async(function dispatch$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              next = function next() {
                var _handlers$next;
  
                var _value, _value2, match, handler;
  
                return regeneratorRuntime.async(function next$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        context$3$0.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = _slicedToArray(_value, 2);
                      match = _value2[0];
                      handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        context$3$0.next = 12;
                        break;
                      }
  
                      context$3$0.next = 9;
                      return regeneratorRuntime.awrap(handler(state, next));
  
                    case 9:
                      context$3$0.t0 = context$3$0.sent;
                      context$3$0.next = 15;
                      break;
  
                    case 12:
                      context$3$0.next = 14;
                      return regeneratorRuntime.awrap(handler(state));
  
                    case 14:
                      context$3$0.t0 = context$3$0.sent;
  
                    case 15:
                      return context$3$0.abrupt('return', context$3$0.t0);
  
                    case 16:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, null, this);
              };
  
              if (typeof state === 'string' || state instanceof String) {
                state = { path: state };
              }
              cb = cb || emptyFunction;
              routes = this.routes;
              handlers = regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      context$3$0.prev = 3;
                      _iterator = routes[Symbol.iterator]();
  
                    case 5:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        context$3$0.next = 38;
                        break;
                      }
  
                      route = _step.value;
                      match = route.match(state.path);
  
                      if (!match) {
                        context$3$0.next = 35;
                        break;
                      }
  
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      context$3$0.prev = 12;
                      _iterator2 = match.route.handlers[Symbol.iterator]();
  
                    case 14:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        context$3$0.next = 21;
                        break;
                      }
  
                      handler = _step2.value;
                      context$3$0.next = 18;
                      return [match, handler];
  
                    case 18:
                      _iteratorNormalCompletion2 = true;
                      context$3$0.next = 14;
                      break;
  
                    case 21:
                      context$3$0.next = 27;
                      break;
  
                    case 23:
                      context$3$0.prev = 23;
                      context$3$0.t0 = context$3$0['catch'](12);
                      _didIteratorError2 = true;
                      _iteratorError2 = context$3$0.t0;
  
                    case 27:
                      context$3$0.prev = 27;
                      context$3$0.prev = 28;
  
                      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                      }
  
                    case 30:
                      context$3$0.prev = 30;
  
                      if (!_didIteratorError2) {
                        context$3$0.next = 33;
                        break;
                      }
  
                      throw _iteratorError2;
  
                    case 33:
                      return context$3$0.finish(30);
  
                    case 34:
                      return context$3$0.finish(27);
  
                    case 35:
                      _iteratorNormalCompletion = true;
                      context$3$0.next = 5;
                      break;
  
                    case 38:
                      context$3$0.next = 44;
                      break;
  
                    case 40:
                      context$3$0.prev = 40;
                      context$3$0.t1 = context$3$0['catch'](3);
                      _didIteratorError = true;
                      _iteratorError = context$3$0.t1;
  
                    case 44:
                      context$3$0.prev = 44;
                      context$3$0.prev = 45;
  
                      if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                      }
  
                    case 47:
                      context$3$0.prev = 47;
  
                      if (!_didIteratorError) {
                        context$3$0.next = 50;
                        break;
                      }
  
                      throw _iteratorError;
  
                    case 50:
                      return context$3$0.finish(47);
  
                    case 51:
                      return context$3$0.finish(44);
  
                    case 52:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, callee$2$0, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
              })();
              value = undefined, result = undefined, done = false;
  
            case 6:
              if (done) {
                context$2$0.next = 16;
                break;
              }
  
              context$2$0.next = 9;
              return regeneratorRuntime.awrap(next());
  
            case 9:
              result = context$2$0.sent;
  
              if (!result) {
                context$2$0.next = 14;
                break;
              }
  
              state.statusCode = 200;
              cb(state, result);
              return context$2$0.abrupt('return');
  
            case 14:
              context$2$0.next = 6;
              break;
  
            case 16:
              if (!this.events.error) {
                context$2$0.next = 32;
                break;
              }
  
              context$2$0.prev = 17;
  
              state.statusCode = 404;
              context$2$0.next = 21;
              return regeneratorRuntime.awrap(this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.')));
  
            case 21:
              result = context$2$0.sent;
  
              cb(state, result);
              context$2$0.next = 32;
              break;
  
            case 25:
              context$2$0.prev = 25;
              context$2$0.t0 = context$2$0['catch'](17);
  
              state.statusCode = 500;
              context$2$0.next = 30;
              return regeneratorRuntime.awrap(this.events.error(state, context$2$0.t0));
  
            case 30:
              result = context$2$0.sent;
  
              cb(state, result);
  
            case 32:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this, [[17, 25]]);
      }
    }]);
  
    return Router;
  })();
  
  exports['default'] = Router;
  module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _pathToRegexp = __webpack_require__(9);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(11);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  var Route = (function () {
    function Route(path, handlers) {
      _classCallCheck(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2['default'])(path, this.keys = []);
    }
  
    _createClass(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2['default'](this, path, this.keys, m) : null;
      }
    }]);
  
    return Route;
  })();
  
  exports['default'] = Route;
  module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(10)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var suffix = res[6]
      var asterisk = res[7]
  
      var repeat = suffix === '+' || suffix === '*'
      var optional = suffix === '?' || suffix === '*'
      var delimiter = prefix || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$')
      }
    }
  
    return function (obj) {
      var path = ''
      var data = obj || {}
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = encodeURIComponent(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = token.pattern
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = keys
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys, options)
    }
  
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }
  
    return stringToRegexp(path, keys, options)
  }


/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 11 */
/***/ function(module, exports) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var Match = function Match(route, path, keys, match) {
    _classCallCheck(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = Object.create(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports['default'] = Match;
  module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _nodeFetch = __webpack_require__(13);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(14);
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2['default'])(localUrl(url), options);
  }
  
  exports['default'] = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 14 */
/***/ function(module, exports) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  //Stuff for passport
  
  //Stuff for running node
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var port = process.env.PORT || 5000;
  exports.port = port;
  var host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  exports.host = host;
  //TODO get googleAnalyticsId
  var googleAnalyticsId = 'UA-XXXXX-X';
  exports.googleAnalyticsId = googleAnalyticsId;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fbjsLibEmptyFunction = __webpack_require__(16);
  
  var _fbjsLibEmptyFunction2 = _interopRequireDefault(_fbjsLibEmptyFunction);
  
  //import bs from  '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  
  var _AppScss = __webpack_require__(17);
  
  var _AppScss2 = _interopRequireDefault(_AppScss);
  
  var _Header = __webpack_require__(21);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(37);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(40);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var App = (function (_Component) {
    _inherits(App, _Component);
  
    function App() {
      _classCallCheck(this, App);
  
      _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _fbjsLibEmptyFunction2['default'],
          onSetTitle: context.onSetTitle || _fbjsLibEmptyFunction2['default'],
          onSetMeta: context.onSetMeta || _fbjsLibEmptyFunction2['default'],
          onPageNotFound: context.onPageNotFound || _fbjsLibEmptyFunction2['default']
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        //this.context.insertCss(bs);
        this.removeCss = this.props.context.insertCss(_AppScss2['default']);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(_Header2['default'], null),
          this.props.children,
          _react2['default'].createElement(_Footer2['default'], null)
        ) : this.props.children;
      }
    }], [{
      key: 'propTypes',
      value: {
        context: _react.PropTypes.shape({
          insertCss: _react.PropTypes.func,
          onSetTitle: _react.PropTypes.func,
          onSetMeta: _react.PropTypes.func,
          onPageNotFound: _react.PropTypes.func
        }),
        children: _react.PropTypes.element.isRequired,
        error: _react.PropTypes.object
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        insertCss: _react.PropTypes.func.isRequired,
        onSetTitle: _react.PropTypes.func.isRequired,
        onSetMeta: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    return App;
  })(_react.Component);
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(18);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.App_browserupgrade_1t4{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports
  exports.locals = {
  	"browserupgrade": "App_browserupgrade_1t4"
  };

/***/ },
/* 19 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 20 */
/***/ function(module, exports) {

  'use strict';
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  var canUseURL = typeof URL === 'function' && typeof URL.createObjectURL === 'function' && typeof URL.revokeObjectURL === 'function' && typeof Blob === 'function' && typeof btoa === 'function';
  
  /**
   * Remove style/link elements for specified Module IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] === 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
            if (canUseURL && elem.tagName === 'STYLE' && elem.href) {
              URL.revokeObjectURL(elem.href);
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var _Object$assign = Object.assign({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
  
    try {
  
      for (var _iterator2 = styles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 4);
  
        var id = _step2$value[0];
        var css = _step2$value[1];
        var media = _step2$value[2];
        var sourceMap = _step2$value[3];
  
        if (inserted[id]) {
          if (!replace) {
            inserted[id]++;
            continue;
          }
        }
  
        inserted[id] = 1;
  
        var elem = document.getElementById(prefix + id);
        var create = false;
  
        if (!elem) {
          create = true;
  
          if (sourceMap && canUseURL) {
            elem = document.createElement('link');
            elem.setAttribute('rel', 'stylesheet');
          } else {
            elem = document.createElement('style');
            elem.setAttribute('type', 'text/css');
          }
  
          elem.id = prefix + id;
  
          if (media) {
            elem.setAttribute('media', media);
          }
        }
  
        if (elem.tagName === 'STYLE') {
          if ('textContent' in elem) {
            elem.textContent = css;
          } else {
            elem.styleSheet.cssText = css;
          }
        } else {
          var blob = new Blob([css + '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'], { type: 'text/css' });
  
          var href = elem.href;
          elem.href = URL.createObjectURL(blob);
  
          if (href) {
            URL.revokeObjectURL(href);
          }
        }
  
        if (create) {
          if (prepend) {
            document.head.insertBefore(elem, document.head.childNodes[0]);
          } else {
            document.head.appendChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  
    return removeCss.bind(null, styles.map(function (x) {
      return x[0];
    }));
  }
  
  module.exports = insertCss;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  /**
  * React Starter Kit (https://www.reactstarterkit.com/)
  *
  * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
  *
  * This source code is licensed under the MIT license found in the
  * LICENSE.txt file in the root directory of this source tree.
  */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeaderScss = __webpack_require__(22);
  
  var _HeaderScss2 = _interopRequireDefault(_HeaderScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(32);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var Header = (function (_Component) {
      _inherits(Header, _Component);
  
      function Header() {
          _classCallCheck(this, _Header);
  
          _get(Object.getPrototypeOf(_Header.prototype), 'constructor', this).apply(this, arguments);
      }
  
      _createClass(Header, [{
          key: 'render',
          value: function render() {
              return _react2['default'].createElement(
                  'div',
                  { className: _HeaderScss2['default'].root },
                  _react2['default'].createElement(
                      'div',
                      { className: _HeaderScss2['default'].container },
                      _react2['default'].createElement(
                          _Navigation2['default'],
                          null,
                          _react2['default'].createElement(
                              'span',
                              null,
                              'sexy header omg!!! check out the nav bar under me'
                          )
                      )
                  )
              );
          }
      }]);
  
      var _Header = Header;
      Header = (0, _decoratorsWithStyles2['default'])(_HeaderScss2['default'])(Header) || Header;
      return Header;
  })(_react.Component);
  
  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(23);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Header_root_14I{color:#acacac}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_14I"
  };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  //Allows you to use custom scss for components. React mixin
  function withStyles() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
  
    return function (BaseComponent) {
      return (function (_Component) {
        _inherits(StyledComponent, _Component);
  
        function StyledComponent() {
          _classCallCheck(this, StyledComponent);
  
          _get(Object.getPrototypeOf(StyledComponent.prototype), 'constructor', this).apply(this, arguments);
        }
  
        _createClass(StyledComponent, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.removeCss = this.context.insertCss.apply(undefined, styles);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.removeCss();
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2['default'].createElement(BaseComponent, this.props);
          }
        }], [{
          key: 'contextTypes',
  
          //static is class wide.
          value: {
            insertCss: _react.PropTypes.func.isRequired
          },
          enumerable: true
        }]);
  
        return StyledComponent;
      })(_react.Component);
    };
  }
  
  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _historyLibParsePath = __webpack_require__(26);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _coreLocation = __webpack_require__(27);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  //Wrapper around links to make history. Use this instead of a normal
  //Also allows you to use the onClick method of whatever object you pass to Link
  //with <Link onClick={{}}/>
  //<a></a>
  
  var Link = (function (_Component) {
    _inherits(Link, _Component);
  
    function Link() {
      _classCallCheck(this, Link);
  
      _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var query = _props.query;
  
        var props = _objectWithoutProperties(_props, ['to', 'query']);
  
        return _react2['default'].createElement('a', _extends({ href: _coreLocation2['default'].createHref(to, query), onClick: Link.handleClick.bind(this) }, props));
      }
    }], [{
      key: 'propTypes',
      value: {
        to: _react.PropTypes.string.isRequired,
        query: _react.PropTypes.object,
        state: _react.PropTypes.object,
        onClick: _react.PropTypes.func
      },
      enumerable: true
    }, {
      key: 'handleClick',
      value: function value(event) {
        var allowTransition = true;
        var clickResult = undefined;
  
        if (_this.props && _this.props.onClick) {
          clickResult = _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (clickResult === false || event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          var link = event.currentTarget;
          if (_this.props && _this.props.to) {
            _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])(_this.props.to), {
              state: _this.props && _this.props.state || null
            }));
          } else {
            _coreLocation2['default'].push({
              pathname: link.pathname,
              search: link.search,
              state: _this.props && _this.props.state || null
            });
          }
        }
      },
      enumerable: true
    }]);
  
    return Link;
  })(_react.Component);
  
  exports['default'] = Link;
  module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("history/lib/parsePath");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  //facebook js library
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fbjsLibExecutionEnvironment = __webpack_require__(28);
  
  //Perserves browser history
  
  var _historyLibCreateBrowserHistory = __webpack_require__(29);
  
  var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);
  
  var _historyLibCreateMemoryHistory = __webpack_require__(30);
  
  var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
  
  var _historyLibUseQueries = __webpack_require__(31);
  
  var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
  
  var location = (0, _historyLibUseQueries2['default'])(_fbjsLibExecutionEnvironment.canUseDOM ? _historyLibCreateBrowserHistory2['default'] : _historyLibCreateMemoryHistory2['default'])();
  
  exports['default'] = location;
  module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/ExecutionEnvironment");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(33);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _NavigationScss = __webpack_require__(34);
  
  var _NavigationScss2 = _interopRequireDefault(_NavigationScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _reactBootstrap = __webpack_require__(36);
  
  var Navigation = (function (_Component) {
    _inherits(Navigation, _Component);
  
    function Navigation() {
      _classCallCheck(this, _Navigation);
  
      _get(Object.getPrototypeOf(_Navigation.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Navigation, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          _reactBootstrap.Navbar,
          { inverse: true },
          _react2['default'].createElement(
            _reactBootstrap.Navbar.Header,
            null,
            _react2['default'].createElement(
              _reactBootstrap.Navbar.Brand,
              null,
              _react2['default'].createElement(
                'a',
                { className: _NavigationScss2['default'].link, href: '/', onClick: _Link2['default'].handleClick },
                'AnkiHub'
              )
            ),
            _react2['default'].createElement(_reactBootstrap.Navbar.Toggle, null)
          ),
          _react2['default'].createElement(
            _reactBootstrap.Navbar.Collapse,
            null,
            _react2['default'].createElement(
              _reactBootstrap.Nav,
              null,
              _react2['default'].createElement(
                _reactBootstrap.NavItem,
                null,
                this.props.children
              )
            ),
            _react2['default'].createElement(
              _reactBootstrap.Nav,
              { pullRight: true },
              _react2['default'].createElement(
                _reactBootstrap.NavItem,
                null,
                _react2['default'].createElement(
                  'a',
                  { className: _NavigationScss2['default'].link, href: '/profile', onClick: _Link2['default'].handleClick },
                  'profile'
                )
              ),
              _react2['default'].createElement(
                _reactBootstrap.NavItem,
                null,
                _react2['default'].createElement(
                  'a',
                  { className: _NavigationScss2['default'].link, href: '/home', onClick: _Link2['default'].handleClick },
                  'home'
                )
              )
            )
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        className: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    var _Navigation = Navigation;
    Navigation = (0, _decoratorsWithStyles2['default'])(_NavigationScss2['default'])(Navigation) || Navigation;
    return Navigation;
  })(_react.Component);
  
  exports['default'] = Navigation;
  module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(35);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Navigation_root_2Gx{color:#b9b9b9}.Navigation_link_12k{display:inline-block;padding:3px 8px;text-decoration:none;font-size:1.125em}.Navigation_link_12k,.Navigation_link_12k:active,.Navigation_link_12k:visited{color:#b9b9b9}.Navigation_link_12k:hover{color:#999}.Navigation_highlight_2cu{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(134,215,203,.15);color:#999}.Navigation_highlight_2cu:hover{background:rgba(25,101,90,.33)}.Navigation_spacer_2MV{color:#b9b9b9}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_2Gx",
  	"link": "Navigation_link_12k",
  	"highlight": "Navigation_highlight_2cu",
  	"spacer": "Navigation_spacer_2MV"
  };

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FeedbackScss = __webpack_require__(38);
  
  var _FeedbackScss2 = _interopRequireDefault(_FeedbackScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var Feedback = (function (_Component) {
    _inherits(Feedback, _Component);
  
    function Feedback() {
      _classCallCheck(this, _Feedback);
  
      _get(Object.getPrototypeOf(_Feedback.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Feedback, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _FeedbackScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _FeedbackScss2['default'].container },
            _react2['default'].createElement(
              'a',
              { className: _FeedbackScss2['default'].link, href: 'https://gitter.im/kriasoft/react-starter-kit' },
              'Ask a question'
            ),
            _react2['default'].createElement(
              'span',
              { className: _FeedbackScss2['default'].spacer },
              '|'
            ),
            _react2['default'].createElement(
              'a',
              { className: _FeedbackScss2['default'].link, href: 'https://github.com/kriasoft/react-starter-kit/issues/new' },
              'Report an issue'
            )
          )
        );
      }
    }]);
  
    var _Feedback = Feedback;
    Feedback = (0, _decoratorsWithStyles2['default'])(_FeedbackScss2['default'])(Feedback) || Feedback;
    return Feedback;
  })(_react.Component);
  
  exports['default'] = Feedback;
  module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(39);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Feedback_root_LW7{background:#f5f5f5;color:#333}.Feedback_container_3dV{margin:0 auto;padding:20px 8px;max-width:1000px;text-align:center;font-size:1.5em}.Feedback_link_17l,.Feedback_link_17l:active,.Feedback_link_17l:hover,.Feedback_link_17l:visited{color:#333;text-decoration:none}.Feedback_link_17l:hover{text-decoration:underline}.Feedback_spacer_Iut{padding-right:15px;padding-left:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Feedback_root_LW7",
  	"container": "Feedback_container_3dV",
  	"link": "Feedback_link_17l",
  	"spacer": "Feedback_spacer_Iut"
  };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterScss = __webpack_require__(41);
  
  var _FooterScss2 = _interopRequireDefault(_FooterScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var Footer = (function (_Component) {
    _inherits(Footer, _Component);
  
    function Footer() {
      _classCallCheck(this, _Footer);
  
      _get(Object.getPrototypeOf(_Footer.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Footer, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _FooterScss2['default'].root },
          'sexy footer'
        );
      }
    }]);
  
    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterScss2['default'])(Footer) || Footer;
    return Footer;
  })(_react.Component);
  
  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(42);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Footer_root_3dP{color:#d1d1d1}.Footer_spacer_3n7{color:hsla(0,0%,100%,.3)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_3dP",
  	"spacer": "Footer_spacer_3n7"
  };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContentPageScss = __webpack_require__(44);
  
  var _ContentPageScss2 = _interopRequireDefault(_ContentPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var ContentPage = (function (_Component) {
    _inherits(ContentPage, _Component);
  
    function ContentPage() {
      _classCallCheck(this, _ContentPage);
  
      _get(Object.getPrototypeOf(_ContentPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ContentPage, [{
      key: 'render',
      value: function render() {
        this.context.onSetTitle(this.props.title);
        return _react2['default'].createElement(
          'div',
          { className: _ContentPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _ContentPageScss2['default'].container },
            this.props.path === '/' ? null : _react2['default'].createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } }),
            'i am from contentpage.js omg!!! this.props.content, the stuff you see above, is set in index.jade wow!!!!'
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        path: _react.PropTypes.string.isRequired,
        content: _react.PropTypes.string.isRequired,
        title: _react.PropTypes.string
      },
  
      //Context is a form of inheritence. Every react element within the App element
      //has access to these
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ContentPage = ContentPage;
    ContentPage = (0, _decoratorsWithStyles2['default'])(_ContentPageScss2['default'])(ContentPage) || ContentPage;
    return ContentPage;
  })(_react.Component);
  
  exports['default'] = ContentPage;
  module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(45);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".ContentPage_container_1JT{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "ContentPage_root_1Kg",
  	"container": "ContentPage_container_1JT"
  };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContactPageScss = __webpack_require__(47);
  
  var _ContactPageScss2 = _interopRequireDefault(_ContactPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Contact Us';
  
  var ContactPage = (function (_Component) {
    _inherits(ContactPage, _Component);
  
    function ContactPage() {
      _classCallCheck(this, _ContactPage);
  
      _get(Object.getPrototypeOf(_ContactPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ContactPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _ContactPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _ContactPageScss2['default'].container },
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            _react2['default'].createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ContactPage = ContactPage;
    ContactPage = (0, _decoratorsWithStyles2['default'])(_ContactPageScss2['default'])(ContactPage) || ContactPage;
    return ContactPage;
  })(_react.Component);
  
  exports['default'] = ContactPage;
  module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(48);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".ContactPage_container_2pQ{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "ContactPage_root_c4z",
  	"container": "ContactPage_container_2pQ"
  };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  //Applies custmo style
  
  var _TodoPageScss = __webpack_require__(50);
  
  var _TodoPageScss2 = _interopRequireDefault(_TodoPageScss);
  
  //Import custom styles
  
  var _storesTodoStore = __webpack_require__(52);
  
  var _storesTodoStore2 = _interopRequireDefault(_storesTodoStore);
  
  var _actionsTodoActions = __webpack_require__(55);
  
  var _actionsTodoActions2 = _interopRequireDefault(_actionsTodoActions);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var title = 'Stuff Todo'; //page title
  
  //sets styles.
  
  var TodoPage = (function (_Component) {
    _inherits(TodoPage, _Component);
  
    _createClass(TodoPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
  
      //Constroctor for class.
      //REMEBER props and state are two different things.
      //databinding uses props.
      enumerable: true
    }]);
  
    function TodoPage(props) {
      _classCallCheck(this, _TodoPage);
  
      _get(Object.getPrototypeOf(_TodoPage.prototype), 'constructor', this).call(this, props);
      this.state = _storesTodoStore2['default'].getState();
      //need to use bind so that the this variable for onChange
      //refers to this TodoPage object not the function
      this.onChange = this.onChange.bind(this);
    }
  
    _createClass(TodoPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
  
      //Alwasy call
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        //makes the TodoStore call the onchange function whenever it cnanges.
        //This is why we had to use bind
        _storesTodoStore2['default'].listen(this.onChange);
        //As soon as it is poling for data get data
        _actionsTodoActions2['default'].getTodos();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        //remove event listener
        _storesTodoStore2['default'].unlisten(this.onChange);
      }
  
      //simply sets the state whenever the todo store changes
    }, {
      key: 'onChange',
      value: function onChange(state) {
        this.setState(state);
        console.log(this.getState);
      }
    }, {
      key: 'render',
      value: function render() {
        var todos = this.state.todos.map(function (todo) {
          return _react2['default'].createElement(
            'li',
            { key: todo.id },
            _react2['default'].createElement(
              'a',
              { href: '/todo/' + todo.id, onClick: _Link2['default'].handleClick },
              todo.name
            ),
            _react2['default'].createElement(
              'p',
              null,
              todo.description
            )
          );
        });
        //Render component
        return _react2['default'].createElement(
          'div',
          { className: _TodoPageScss2['default'].root },
          ' //Sets the root class',
          _react2['default'].createElement(
            'div',
            { className: _TodoPageScss2['default'].container },
            ' //sets the container style',
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            ' //one way databinding //for loop to draw all of the todos',
            todos,
            _react2['default'].createElement(
              'p',
              null,
              'Try to complete the aboe todos'
            )
          )
        );
      }
    }]);
  
    var _TodoPage = TodoPage;
    TodoPage = (0, _decoratorsWithStyles2['default'])(_TodoPageScss2['default'])(TodoPage) || TodoPage;
    return TodoPage;
  })(_react.Component);
  
  exports['default'] = TodoPage;
  module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(51);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".TodoPage_container_1bn{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "TodoPage_root_3fz",
  	"container": "TodoPage_container_1bn"
  };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreDispatcher = __webpack_require__(53);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _actionsTodoActions = __webpack_require__(55);
  
  var _actionsTodoActions2 = _interopRequireDefault(_actionsTodoActions);
  
  //Remember that ever component gets it's own store
  
  var TodoStore = (function () {
    function TodoStore() {
      _classCallCheck(this, TodoStore);
  
      this.bindActions(_actionsTodoActions2['default']);
      this.todos = [];
    }
  
    //Notice the naming scheme. Alt expects hte functions to be named on
    //followed by Actions
  
    _createClass(TodoStore, [{
      key: 'onGetTodosSuccess',
      value: function onGetTodosSuccess(data) {
        this.todos = data;
      }
    }, {
      key: 'onGetTodosFail',
      value: function onGetTodosFail(err) {
        //use toastr library to have popup error
        toastr.error(data.message);
      }
    }]);
  
    return TodoStore;
  })();
  
  exports['default'] = _coreDispatcher2['default'].createStore(TodoStore);
  module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _alt = __webpack_require__(54);
  
  var _alt2 = _interopRequireDefault(_alt);
  
  var dispatcher = new _alt2['default']();
  
  exports['default'] = dispatcher;
  module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports) {

  module.exports = require("alt");

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreDispatcher = __webpack_require__(53);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _jquery = __webpack_require__(56);
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  //Remember that this file runs on the client not the server
  
  var TodoActions = (function () {
    function TodoActions() {
      _classCallCheck(this, TodoActions);
  
      //Each of these actiosn will become a function
      this.generateActions('getTodosSuccess', 'getTodosFail');
      console.log(this);
    }
  
    //Directly callled by TodoPage
    //R
  
    _createClass(TodoActions, [{
      key: 'getTodos',
      value: function getTodos() {
        var _this = this;
  
        //Get all todos
        console.log(this);
        _jquery2['default'].ajax({ url: '/api/todo/all' }).done(function (data) {
          _this.getTodosSuccess(data);
        }).fail(function (err) {
          _this.getTodosFail(err);
        });
      }
    }]);
  
    return TodoActions;
  })();
  
  exports['default'] = _coreDispatcher2['default'].createActions(TodoActions);
  module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports) {

  module.exports = require("jquery");

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  //Applies custmo style
  
  var _DeckPageScss = __webpack_require__(58);
  
  var _DeckPageScss2 = _interopRequireDefault(_DeckPageScss);
  
  //Import custom styles
  
  var _storesDeckStore = __webpack_require__(60);
  
  var _storesDeckStore2 = _interopRequireDefault(_storesDeckStore);
  
  var _actionsDeckActions = __webpack_require__(61);
  
  var _actionsDeckActions2 = _interopRequireDefault(_actionsDeckActions);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var title = 'Stuff Deck'; //page title
  
  //sets styles.
  
  var DeckPage = (function (_Component) {
    _inherits(DeckPage, _Component);
  
    _createClass(DeckPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
  
      //Constroctor for class.
      //REMEBER props and state are two different things.
      //databinding uses props.
      enumerable: true
    }]);
  
    function DeckPage(props) {
      _classCallCheck(this, _DeckPage);
  
      _get(Object.getPrototypeOf(_DeckPage.prototype), 'constructor', this).call(this, props);
      this.state = _storesDeckStore2['default'].getState();
      //need to use bind so that the this variable for onChange
      //refers to this DeckPage object not the function
      this.onChange = this.onChange.bind(this);
    }
  
    _createClass(DeckPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
  
      //Alwasy call
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        //makes the DeckStore call the onchange function whenever it cnanges.
        //This is why we had to use bind
        _storesDeckStore2['default'].listen(this.onChange);
        //As soon as it is poling for data get data
        _actionsDeckActions2['default'].getDecks();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        //remove event listener
        _storesDeckStore2['default'].unlisten(this.onChange);
      }
  
      //simply sets the state whenever the Deck store changes
    }, {
      key: 'onChange',
      value: function onChange(state) {
        this.setState(state);
        console.log(this.getState);
      }
    }, {
      key: 'render',
      value: function render() {
        var Decks = this.state.decks.map(function (Deck) {
          return _react2['default'].createElement(
            'li',
            { key: Deck.id },
            _react2['default'].createElement(
              'a',
              { href: '/Deck/' + Deck.id, onClick: _Link2['default'].handleClick },
              Deck.name
            ),
            _react2['default'].createElement(
              'p',
              null,
              Deck.description
            )
          );
        });
        //Render component
        return _react2['default'].createElement(
          'div',
          { className: _DeckPageScss2['default'].root },
          ' //Sets the root class',
          _react2['default'].createElement(
            'div',
            { className: _DeckPageScss2['default'].container },
            ' //sets the container style',
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            ' //one way databinding //for loop to draw all of the Decks',
            Decks,
            _react2['default'].createElement(
              'p',
              null,
              'Try to complete the aboe Decks'
            )
          )
        );
      }
    }]);
  
    var _DeckPage = DeckPage;
    DeckPage = (0, _decoratorsWithStyles2['default'])(_DeckPageScss2['default'])(DeckPage) || DeckPage;
    return DeckPage;
  })(_react.Component);
  
  exports['default'] = DeckPage;
  module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(59);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".DeckPage_container_1YM{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "DeckPage_root_1Dz",
  	"container": "DeckPage_container_1YM"
  };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreDispatcher = __webpack_require__(53);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _actionsDeckActions = __webpack_require__(61);
  
  var _actionsDeckActions2 = _interopRequireDefault(_actionsDeckActions);
  
  var _toastr = __webpack_require__(63);
  
  var _toastr2 = _interopRequireDefault(_toastr);
  
  var DeckStore = (function () {
    function DeckStore() {
      _classCallCheck(this, DeckStore);
  
      this.bindListeners({
        onGetAllDecksSuccess: _actionsDeckActions2['default'].getAllDecksSuccess,
        onGetAllDecksFail: _actionsDeckActions2['default'].getAllDecksFail,
        onUploadDeckSuccess: _actionsDeckActions2['default'].uploadDeckSuccess,
        onUploadDeckFail: _actionsDeckActions2['default'].uploadDeckFail,
        onGetDeckSuccess: _actionsDeckActions2['default'].getDeckSuccess,
        onGetDeckFail: _actionsDeckActions2['default'].getDeckFail,
        onPostTransactionsSuccess: _actionsDeckActions2['default'].postTransactionsSuccess,
        onPostTransactionsFail: _actionsDeckActions2['default'].postTransactionsFail,
        onGetTransactionsSuccess: _actionsDeckActions2['default'].getTransactionsSuccess,
        onGetTransactionsFail: _actionsDeckActions2['default'].getTransactionsFail
      });
      this.decks = [];
      this.workingDeck = null;
      this.transactions = [];
    }
  
    _createClass(DeckStore, [{
      key: 'onGetAllDecksSuccess',
      value: function onGetAllDecksSuccess(data) {
        this.decks = data;
      }
    }, {
      key: 'onGetAllDecksFail',
      value: function onGetAllDecksFail(data) {
        _toastr2['default'].error(data);
      }
    }, {
      key: 'onUploadDeckSuccess',
      value: function onUploadDeckSuccess(data) {
        if (this.workingDeck) {
          this.decks.push(this.workingDeck);
        }
        this.workingDeck = data;
      }
    }, {
      key: 'onUploadDeckFail',
      value: function onUploadDeckFail(data) {
        _toastr2['default'].error(data);
      }
    }, {
      key: 'onGetDeckSuccess',
      value: function onGetDeckSuccess(data) {
        if (this.workingDeck) {
          this.decks.push(this.workingDeck);
        }
        this.workingDeck = data;
      }
    }, {
      key: 'onGetDeckFail',
      value: function onGetDeckFail(data) {
        _toastr2['default'].error(data);
      }
    }, {
      key: 'onPostTransactionsSuccess',
      value: function onPostTransactionsSuccess(data) {
        this.transactions.concat(data);
      }
    }, {
      key: 'onPostTransactionsFail',
      value: function onPostTransactionsFail(data) {
        _toastr2['default'].error(data);
      }
    }, {
      key: 'onGetTransactionsSuccess',
      value: function onGetTransactionsSuccess() {
        this.transactions.concat(data);
      }
    }, {
      key: 'onGetTransactionsFail',
      value: function onGetTransactionsFail() {
        _toastr2['default'].error(data);
      }
    }]);
  
    return DeckStore;
  })();
  
  exports['default'] = _coreDispatcher2['default'].createStore(DeckStore);
  module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreDispatcher = __webpack_require__(53);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _coreMisc = __webpack_require__(62);
  
  var _jquery = __webpack_require__(56);
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var DeckActions = (function () {
    function DeckActions() {
      _classCallCheck(this, DeckActions);
  
      this.generateActions('getAllDecksFail', 'getAllDecksSuccess', 'uploadDeckSuccess', 'uploadDeckFail', 'getDeckSuccess', 'getDeckFail', 'postTransactionsSuccess', 'postTransactionsFail', 'getTransactionsSuccess', 'getTransactionsFail');
    }
  
    _createClass(DeckActions, [{
      key: 'getAllDecks',
      value: function getAllDecks(options) {
        var self = this;
        var optionsString = options ? '?' + (0, _coreMisc.toQueryString)(options) : '';
        _jquery2['default'].get('/api/decks' + optionsString).done(function (data) {
          self.getAllDecksSuccess(data);
        }).fail(function (data) {
          self.getAllDecksFail(data);
        });
      }
    }, {
      key: 'uploadDeck',
      value: function uploadDeck(deck) {
        var self = this;
        _jquery2['default'].post('/api/decks', decks).done(function (data) {
          self.uploadDeckSuccess(data);
        }).fail(function (data) {
          self.uploadDeckFail(data);
        });
      }
    }, {
      key: 'getDeck',
      value: function getDeck(did) {
        var self = this;
        _jquery2['default'].get('/api/decks/' + did).done(function (data) {
          self.getDeckSuccess(data);
        }).fail(function (data) {
          self.getDeckFail(data);
        });
      }
    }, {
      key: 'postTransactions',
      value: function postTransactions(did, transactions) {
        var self = this;
        _jquery2['default'].post('/api/decks/' + did, transactions).done(function (data) {
          self.postTransactionsSuccess(data);
        }).fail(function (data) {
          self.postTransactionsFail(data);
        });
      }
    }, {
      key: 'getTransactions',
      value: function getTransactions(did) {
        var self = this;
        _jquery2['default'].get('/api/decks/' + did + '/transactions').done(function (data) {
          self.getTransactionsSuccess(data);
        }).fail(function (data) {
          self.getTransactionsFail(data);
        });
      }
    }]);
  
    return DeckActions;
  })();
  
  exports['default'] = _coreDispatcher2['default'].createActions(DeckActions);
  module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var toQueryString = function toQueryString(obj, prefix) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
        str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  };
  exports.toQueryString = toQueryString;

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("toastr");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LoginPageScss = __webpack_require__(65);
  
  var _LoginPageScss2 = _interopRequireDefault(_LoginPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Log In';
  
  var LoginPage = (function (_Component) {
    _inherits(LoginPage, _Component);
  
    function LoginPage() {
      _classCallCheck(this, _LoginPage);
  
      _get(Object.getPrototypeOf(_LoginPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(LoginPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _LoginPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _LoginPageScss2['default'].container },
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            _react2['default'].createElement(
              'p',
              null,
              '...'
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _LoginPage = LoginPage;
    LoginPage = (0, _decoratorsWithStyles2['default'])(_LoginPageScss2['default'])(LoginPage) || LoginPage;
    return LoginPage;
  })(_react.Component);
  
  exports['default'] = LoginPage;
  module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(66);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".LoginPage_container_2c5{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "LoginPage_root_5f7",
  	"container": "LoginPage_container_2c5"
  };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _RegisterPageScss = __webpack_require__(68);
  
  var _RegisterPageScss2 = _interopRequireDefault(_RegisterPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _actionsProfileActions = __webpack_require__(70);
  
  var _actionsProfileActions2 = _interopRequireDefault(_actionsProfileActions);
  
  var _reactBootstrap = __webpack_require__(36);
  
  var title = 'New User Registration';
  
  var SignUpForm = _react2['default'].createClass({
    displayName: 'SignUpForm',
  
    getInitialState: function getInitialState() {
      return { username: '', email: '', password: '', confirmPassword: '' };
    },
    handleUsernameChange: function handleUsernameChange(e) {
      this.setState({ username: e.target.value });
    },
    handleEmailChange: function handleEmailChange(e) {
      this.setState({ email: e.target.value });
    },
    handlePasswordChange: function handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    },
    handleConfirmPasswordChange: function handleConfirmPasswordChange(e) {
      this.setState({ confirmPassword: e.target.value });
    },
    handleSubmit: function handleSubmit(e) {
      e.preventDefault();
      var username = this.state.owner.trim();
      var email = this.state.email;
      var password = this.state.password;
      var confirmPassword = this.state.confirmPassword;
      if (!username || !email || !password || password != confirmPassword) {
        return;
      }
      this.props.onCommentSubmit({ owner: owner, text: text });
      this.setState({ owner: '', text: '' });
    },
    render: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'signUpForm' },
        _react2['default'].createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2['default'].createElement(_reactBootstrap.Input, { type: 'text', label: 'Text', placeholder: 'Username',
            value: this.state.username, onChange: this.handleUsernameChange }),
          _react2['default'].createElement(_reactBootstrap.Input, { type: 'email', label: 'Email Address', placeholder: 'Enter email',
            value: this.state.email, onChange: this.handleEmailChange }),
          _react2['default'].createElement(_reactBootstrap.Input, { type: 'password', label: 'Password',
            value: this.state.password, onChange: this.handlePasswordChange }),
          _react2['default'].createElement(_reactBootstrap.Input, { type: 'password', label: 'Confirm Password',
            value: this.state.confirmPassword, onChange: this.handleConfirmPasswordChange }),
          _react2['default'].createElement(_reactBootstrap.ButtonInput, { type: 'reset', value: 'Reset Button' }),
          _react2['default'].createElement(_reactBootstrap.ButtonInput, { type: 'submit', value: 'Submit Button' })
        )
      );
    }
  });
  
  var RegisterPage = (function (_Component) {
    _inherits(RegisterPage, _Component);
  
    function RegisterPage() {
      _classCallCheck(this, _RegisterPage);
  
      _get(Object.getPrototypeOf(_RegisterPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(RegisterPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _RegisterPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _RegisterPageScss2['default'].container },
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            _react2['default'].createElement(SignUpForm, null)
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _RegisterPage = RegisterPage;
    RegisterPage = (0, _decoratorsWithStyles2['default'])(_RegisterPageScss2['default'])(RegisterPage) || RegisterPage;
    return RegisterPage;
  })(_react.Component);
  
  exports['default'] = RegisterPage;
  module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(69);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".RegisterPage_container_6L5{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "RegisterPage_root_2Yr",
  	"container": "RegisterPage_container_6L5"
  };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreDispatcher = __webpack_require__(53);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _jquery = __webpack_require__(56);
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  //Remember that this file runs on the client not the server
  
  var ProfileActions = (function () {
    function ProfileActions() {
      _classCallCheck(this, ProfileActions);
  
      //Each of these actiosn will become a function
      this.generateActions('signUpSuccess', 'signUpFail', 'logInSuccess', 'logInFail', 'logOutSuccess', 'logOutFail');
    }
  
    _createClass(ProfileActions, [{
      key: 'signUp',
      value: function signUp(info) {
        var self = this;
        _jquery2['default'].post('/api/users/signup', info).done(function (data) {
          self.signUpSuccess(data);
        }).fail(function (data) {
          self.signUpFail(data);
        });
      }
    }, {
      key: 'logIn',
      value: function logIn(info) {
        var self = this;
        _jquery2['default'].post('/api/users/login', info).done(function (data) {
          self.logInSuccess(data);
        }).fail(function (data) {
          self.logInFail(data);
        });
      }
    }, {
      key: 'logOut',
      value: function logOut() {
        var self = this;
        _jquery2['default'].post('/api/users/logout').done(function (data) {
          self.logOutSucess(data);
        }).fail(function (data) {
          self.logOutFail(data);
        });
      }
    }]);
  
    return ProfileActions;
  })();
  
  exports['default'] = _coreDispatcher2['default'].createActions(ProfileActions);
  module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NotFoundPageScss = __webpack_require__(72);
  
  var _NotFoundPageScss2 = _interopRequireDefault(_NotFoundPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Page Not Found';
  
  var NotFoundPage = (function (_Component) {
    _inherits(NotFoundPage, _Component);
  
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
  
      _get(Object.getPrototypeOf(_NotFoundPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageScss2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })(_react.Component);
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(73);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ErrorPageScss = __webpack_require__(75);
  
  var _ErrorPageScss2 = _interopRequireDefault(_ErrorPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Error';
  
  var ErrorPage = (function (_Component) {
    _inherits(ErrorPage, _Component);
  
    function ErrorPage() {
      _classCallCheck(this, _ErrorPage);
  
      _get(Object.getPrototypeOf(_ErrorPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ErrorPage = ErrorPage;
    ErrorPage = (0, _decoratorsWithStyles2['default'])(_ErrorPageScss2['default'])(ErrorPage) || ErrorPage;
    return ErrorPage;
  })(_react.Component);
  
  exports['default'] = ErrorPage;
  module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(76);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ProfilePageScss = __webpack_require__(78);
  
  var _ProfilePageScss2 = _interopRequireDefault(_ProfilePageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _storesDeckStore = __webpack_require__(60);
  
  var _storesDeckStore2 = _interopRequireDefault(_storesDeckStore);
  
  var _actionsDeckActions = __webpack_require__(61);
  
  var _actionsDeckActions2 = _interopRequireDefault(_actionsDeckActions);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  //Boostrap components
  
  var _reactBootstrap = __webpack_require__(36);
  
  // tutorial10.js
  var DeckList = _react2['default'].createClass({
      displayName: 'DeckList',
  
      render: function render() {
          var deckNodes = this.props.data.map(function (deck) {
              return(
                  // <Deck
                  // key = {deck.name}
                  // name = {deck.name}
                  // desc = {deck.desc}
                  // owner={deck.owner}
                  // cids = {deck.cids}
                  // children = {deck.children}
                  // subscribers = {deck.subscribers}
                  // >
                  _react2['default'].createElement(Deck, {
                      did: deck.did,
                      name: deck.name,
                      //keywords = {deck.keywords}
                      //desc = {deck.desc}
                      //cids = {deck.cids}
                      //newCards = {deck.newCards}
                      owner: deck.owner
                      //ispublic = {deck.ispublic}
                      //children = {deck.children}
                      //subscribers = {deck.subscribers}
                  })
              );
          });
          return _react2['default'].createElement(
              'div',
              { className: 'commentList' },
              deckNodes
          );
      }
  });
  
  // tutorial16.js
  var DeckForm = _react2['default'].createClass({
      displayName: 'DeckForm',
  
      getInitialState: function getInitialState() {
          return { owner: '', text: '' };
      },
      handleownerChange: function handleownerChange(e) {
          this.setState({ owner: e.target.value });
      },
      handleTextChange: function handleTextChange(e) {
          this.setState({ text: e.target.value });
      },
      handleSubmit: function handleSubmit(e) {
          e.preventDefault();
          var owner = this.state.owner.trim();
          var text = this.state.text.trim();
          if (!text || !owner) {
              return;
          }
          this.props.onCommentSubmit({ owner: owner, text: text });
          this.setState({ owner: '', text: '' });
      },
      render: function render() {
          return _react2['default'].createElement(
              'form',
              { className: 'commentForm', onSubmit: this.handleSubmit },
              _react2['default'].createElement('input', {
                  type: 'text',
                  placeholder: 'Your name',
                  value: this.state.owner,
                  onChange: this.handleownerChange
              }),
              _react2['default'].createElement('input', {
                  type: 'text',
                  placeholder: 'Say something...',
                  value: this.state.deck,
                  onChange: this.handleTextChange
              }),
              _react2['default'].createElement('input', { type: 'submit', value: 'Post' })
          );
      }
  });
  
  // tutorial7.js
  var Deck = _react2['default'].createClass({
      displayName: 'Deck',
  
      render: function render() {
          return _react2['default'].createElement(
              'div',
              { className: 'deck' },
              _react2['default'].createElement(
                  'div',
                  { className: 'name' },
                  'Name: ',
                  this.props.name
              ),
              _react2['default'].createElement(
                  'div',
                  { className: 'owner' },
                  'Owner: ',
                  this.props.owner
              )
          );
      }
  });
  
  var Nav = _react2['default'].createClass({
      displayName: 'Nav',
  
      render: function render() {
          return _react2['default'].createElement(
              'a',
              {
                  className: 'nav',
                  url: this.props.url,
                  onClick: this.handleClick },
              this.props.text
          );
      },
      handleClick: function handleClick(event) {
          this.props.update(this.props.url);
      }
  });
  
  // tutorial14.js
  
  var DeckBox = (function (_Component) {
      _inherits(DeckBox, _Component);
  
      _createClass(DeckBox, null, [{
          key: 'contextTypes',
          value: {
              onSetTitle: _react.PropTypes.func.isRequired
          },
  
          //Constroctor for class.
          //REMEBER props and state are two different things.
          //databinding uses props.
          enumerable: true
      }]);
  
      function DeckBox(props) {
          _classCallCheck(this, DeckBox);
  
          _get(Object.getPrototypeOf(DeckBox.prototype), 'constructor', this).call(this, props);
          this.state = _storesDeckStore2['default'].getState();
          //need to use bind so that the this variable for onChange
          //refers to this DeckPage object not the function
          this.onChange = this.onChange.bind(this);
      }
  
      // <DeckForm onCommentSubmit={this.handleCommentSubmit} />
  
      _createClass(DeckBox, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
              this.context.onSetTitle("Profile Page");
          }
  
          //Alwasy call
      }, {
          key: 'componentDidMount',
          value: function componentDidMount() {
              //makes the DeckStore call the onchange function whenever it cnanges.
              //This is why we had to use bind
              _storesDeckStore2['default'].listen(this.onChange);
              //As soon as it is poling for data get data
              _actionsDeckActions2['default'].getAllDecks();
          }
      }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
              //remove event listener
              _storesDeckStore2['default'].unlisten(this.onChange);
          }
  
          //simply sets the state whenever the Deck store changes
      }, {
          key: 'onChange',
          value: function onChange(state) {
              this.setState(state);
              console.log("Getting new State", this.getState);
          }
      }, {
          key: 'loadCommentsFromServer',
          value: function loadCommentsFromServer() {
              $.ajax({
                  url: this.state.url,
                  dataType: 'json',
                  cache: false,
                  success: (function (data) {
                      this.setState({ data: data });
                  }).bind(this),
                  error: (function (xhr, status, err) {
                      console.error(this.state.url, status, err.toString());
                  }).bind(this)
              });
          }
      }, {
          key: 'handleUpdate',
          value: function handleUpdate(_url) {
  
              $.ajax({
                  url: _url,
                  dataType: 'json',
                  cache: false,
                  success: (function (data) {
                      this.setState({ data: data, url: _url });
                  }).bind(this),
                  error: (function (xhr, status, err) {
                      console.error(_url, status, err.toString());
                  }).bind(this)
              });
          }
      }, {
          key: 'handleCommentSubmit',
          value: function handleCommentSubmit(comment) {
              var comments = this.state.data;
              // Optimistically set an id on the new comment that will be replaced
              comment.id = Date.now();
              var newComments = comments.concat([comment]);
              this.setState({ data: newComments, url: this.state.url });
  
              $.ajax({
                  url: this.state.url,
                  dataType: 'json',
                  type: 'POST',
                  data: comment,
                  success: (function (data) {
                      this.setState({ data: data });
                  }).bind(this),
                  error: (function (xhr, status, err) {
                      this.setState({ data: comments });
                      console.error(this.state.url, status, err.toString());
                  }).bind(this)
              });
          }
      }, {
          key: 'render',
          value: function render() {
              console.log(this.state.decks);
              return _react2['default'].createElement(
                  'div',
                  { className: 'commentBox' },
                  _react2['default'].createElement(
                      _reactBootstrap.ButtonToolbar,
                      null,
                      _react2['default'].createElement(
                          _reactBootstrap.Button,
                          null,
                          'Default'
                      ),
                      _react2['default'].createElement(
                          _reactBootstrap.Button,
                          { bsStyle: 'primary' },
                          'Primary'
                      ),
                      _react2['default'].createElement(
                          _reactBootstrap.Button,
                          { bsStyle: 'success' },
                          'Success'
                      ),
                      _react2['default'].createElement(
                          _reactBootstrap.Button,
                          { bsStyle: 'info' },
                          'Info'
                      ),
                      _react2['default'].createElement(
                          _reactBootstrap.Button,
                          { bsStyle: 'warning' },
                          'Warning'
                      ),
                      _react2['default'].createElement(
                          _reactBootstrap.Button,
                          { bsStyle: 'danger' },
                          'Danger'
                      ),
                      _react2['default'].createElement(
                          _reactBootstrap.Button,
                          { bsStyle: 'link' },
                          'Link'
                      )
                  ),
                  'these are some decks from profilepage.js omg!!!!',
                  _react2['default'].createElement(DeckList, { data: this.state.decks })
              );
          }
      }]);
  
      return DeckBox;
  })(_react.Component);
  
  exports['default'] = DeckBox;
  module.exports = exports['default'];
  /* Standard button */ /* Provides extra visual weight and identifies the primary action in a set of buttons */ /* Indicates a successful or positive action */ /* Contextual button for informational alert messages */ /* Indicates caution should be taken with this action */ /* Indicates a dangerous or potentially negative action */ /* Deemphasize a button by making it look like a link while maintaining button behavior */

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(79);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".ProfilePage_container_37d{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "ProfilePage_root_3NI",
  	"container": "ProfilePage_container_37d"
  };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  //Applies custmo style
  
  var _HomePageScss = __webpack_require__(81);
  
  var _HomePageScss2 = _interopRequireDefault(_HomePageScss);
  
  //Import custom styles
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _DeckLibDeckList = __webpack_require__(83);
  
  var _DeckLibDeckList2 = _interopRequireDefault(_DeckLibDeckList);
  
  var _reactBootstrap = __webpack_require__(36);
  
  var title = 'Welcome to AnkiHub'; //page title
  
  //sets styles.
  
  var HomePage = (function (_Component) {
    _inherits(HomePage, _Component);
  
    _createClass(HomePage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
  
      //Constroctor for class.
      //REMEBER props and state are two different things.
      //databinding uses props.
      enumerable: true
    }]);
  
    function HomePage(props) {
      _classCallCheck(this, _HomePage);
  
      _get(Object.getPrototypeOf(_HomePage.prototype), 'constructor', this).call(this, props);
  
      this.onChange = this.onChange.bind(this);
    }
  
    _createClass(HomePage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
  
      //Alwasy call
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {}
  
      //simply sets the state whenever the Deck store changes
    }, {
      key: 'onChange',
      value: function onChange(state) {
        this.setState(state);
      }
    }, {
      key: 'render',
      value: function render() {
  
        //Render component
        return _react2['default'].createElement(
          _reactBootstrap.Grid,
          null,
          _react2['default'].createElement(
            _reactBootstrap.Row,
            { className: 'show-grid' },
            _react2['default'].createElement(
              _reactBootstrap.Col,
              { xs: 12, md: 8 },
              _react2['default'].createElement(_DeckLibDeckList2['default'], null)
            ),
            _react2['default'].createElement(
              _reactBootstrap.Col,
              { xs: 6, md: 4 },
              _react2['default'].createElement(
                'div',
                null,
                'Side Bar'
              )
            )
          )
        );
      }
    }]);
  
    var _HomePage = HomePage;
    HomePage = (0, _decoratorsWithStyles2['default'])(_HomePageScss2['default'])(HomePage) || HomePage;
    return HomePage;
  })(_react.Component);
  
  exports['default'] = HomePage;
  module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(82);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".HomePage_container_1JI{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "HomePage_root_cbh",
  	"container": "HomePage_container_1JI"
  };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _actionsDeckActions = __webpack_require__(61);
  
  var _actionsDeckActions2 = _interopRequireDefault(_actionsDeckActions);
  
  var _storesDeckStore = __webpack_require__(60);
  
  var _storesDeckStore2 = _interopRequireDefault(_storesDeckStore);
  
  var _reactBootstrap = __webpack_require__(36);
  
  var _DeckListItem = __webpack_require__(84);
  
  var _DeckListItem2 = _interopRequireDefault(_DeckListItem);
  
  var DeckList = (function (_Component) {
    _inherits(DeckList, _Component);
  
    function DeckList(props) {
      _classCallCheck(this, DeckList);
  
      _get(Object.getPrototypeOf(DeckList.prototype), 'constructor', this).call(this, props);
      this.state = _storesDeckStore2['default'].getState();
      this.onChange = this.onChange.bind(this);
    }
  
    _createClass(DeckList, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        _storesDeckStore2['default'].listen(this.onChange);
        //Todo pass properties
        _actionsDeckActions2['default'].getAllDecks({ limit: 30 });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _storesDeckStore2['default'].unlisten(this.onChange);
      }
    }, {
      key: 'onChange',
      value: function onChange(state) {
        this.setState(state);
      }
    }, {
      key: 'render',
      value: function render() {
        var deckNodes = this.state.decks.map(function (deck, index) {
          return _react2['default'].createElement(_DeckListItem2['default'], { key: index, deck: deck });
        });
        return _react2['default'].createElement(
          'div',
          { 'class': 'deckList' },
          deckNodes
        );
      }
    }]);
  
    return DeckList;
  })(_react.Component);
  
  exports['default'] = DeckList;
  module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _actionsDeckActions = __webpack_require__(61);
  
  var _actionsDeckActions2 = _interopRequireDefault(_actionsDeckActions);
  
  var _storesDeckStore = __webpack_require__(60);
  
  var _storesDeckStore2 = _interopRequireDefault(_storesDeckStore);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _reactBootstrap = __webpack_require__(36);
  
  var DeckListItem = (function (_Component) {
    _inherits(DeckListItem, _Component);
  
    function DeckListItem() {
      _classCallCheck(this, DeckListItem);
  
      _get(Object.getPrototypeOf(DeckListItem.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(DeckListItem, [{
      key: 'render',
      value: function render() {
        var deck = this.props.deck;
        var userUrl = "/users/" + deck.owner;
        var deckUrl = "/decks/" + deck.gid;
        var title = _react2['default'].createElement(
          'h4',
          null,
          _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'align-justify' }),
          _react2['default'].createElement(
            'a',
            { href: userUrl, onClick: _Link2['default'].handleClick },
            deck.owner
          ),
          _react2['default'].createElement(
            'span',
            null,
            '/'
          ),
          _react2['default'].createElement(
            'a',
            { href: deckUrl, onClick: _Link2['default'].handleClick },
            deck.name
          )
        );
        console.log(deck);
        var subscribers = _react2['default'].createElement(
          'span',
          null,
          deck.subscribers.length,
          ' Subscribers'
        );
        var cards = _react2['default'].createElement(
          'span',
          null,
          deck.cids.length,
          ' Cards'
        );
        return _react2['default'].createElement(
          _reactBootstrap.Panel,
          { header: title },
          _react2['default'].createElement(
            'blockquote',
            null,
            deck.desc
          ),
          subscribers,
          cards
        );
      }
    }]);
  
    return DeckListItem;
  })(_react.Component);
  
  exports['default'] = DeckListItem;
  module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(14);
  
  var Html = (function (_Component) {
    _inherits(Html, _Component);
  
    function Html() {
      _classCallCheck(this, Html);
  
      _get(Object.getPrototypeOf(Html.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Html, [{
      key: 'trackingCode',
      value: function trackingCode() {
        return { __html: '(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=' + 'function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;' + 'e=o.createElement(i);r=o.getElementsByTagName(i)[0];' + 'e.src=\'https://www.google-analytics.com/analytics.js\';' + 'r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));' + ('ga(\'create\',\'' + _config.googleAnalyticsId + '\',\'auto\');ga(\'send\',\'pageview\');')
        };
      }
  
      //<!--TODO insert the req.flash in here -->
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'html',
          { className: 'no-js', lang: '' },
          _react2['default'].createElement(
            'head',
            null,
            _react2['default'].createElement('meta', { charSet: 'utf-8' }),
            _react2['default'].createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
            _react2['default'].createElement(
              'title',
              null,
              this.props.title
            ),
            _react2['default'].createElement('meta', { name: 'description', content: this.props.description }),
            _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            _react2['default'].createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' }),
            _react2['default'].createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: this.props.css } })
          ),
          _react2['default'].createElement(
            'body',
            null,
            _react2['default'].createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.body } }),
            _react2['default'].createElement('script', { src: this.props.entry }),
            _react2['default'].createElement('script', { dangerouslySetInnerHTML: this.trackingCode() })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        title: _react.PropTypes.string,
        description: _react.PropTypes.string,
        css: _react.PropTypes.string,
        body: _react.PropTypes.string.isRequired,
        entry: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        title: '',
        description: ''
      },
      enumerable: true
    }]);
  
    return Html;
  })(_react.Component);
  
  exports['default'] = Html;
  module.exports = exports['default'];

/***/ },
/* 86 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 87 */
/***/ function(module, exports) {

  module.exports = require("morgan");

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 89 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 90 */
/***/ function(module, exports) {

  module.exports = require("express-session");

/***/ },
/* 91 */
/***/ function(module, exports) {

  module.exports = require("parse/node");

/***/ },
/* 92 */
/***/ function(module, exports) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = {
    UserToObject: function UserToObject(user) {
      return {
        username: user.get("username"),
        objectId: user.get("objectId"),
        sessionToken: user.get("sessionToken")
      };
    }
  };
  module.exports = exports["default"];

/***/ },
/* 93 */
/***/ function(module, exports) {

  module.exports = require("connect-parse");

/***/ },
/* 94 */
/***/ function(module, exports) {

  module.exports = require("socket.io");

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  //Register todos with aws dynammodb.
  //https://github.com/yortus/asyncawait
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _bluebird = __webpack_require__(96);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _express = __webpack_require__(3);
  
  var _parseNode = __webpack_require__(91);
  
  var _parseNode2 = _interopRequireDefault(_parseNode);
  
  var _UserUtil = __webpack_require__(92);
  
  var _UserUtil2 = _interopRequireDefault(_UserUtil);
  
  var _transactionsTransactionModel = __webpack_require__(97);
  
  var _transactionsTransactionModel2 = _interopRequireDefault(_transactionsTransactionModel);
  
  var router = new _express.Router();
  
  router.get('/', function callee$0$0(req, res, next) {
    var query;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          query = new _parseNode2['default'].Query(_parseNode2['default'].User);
  
          if (req.query.username) {
  
            query.contains("username", req.query.username);
          }
          query.find({
            success: function success(results) {
              //console.log("Succssfully retrieved ", results);
              return res.status(200).send(results);
            },
            error: function error(err) {
              //console.log("Failed to get decks ", err);
              return res.status(400).send(err);
            },
            sessionToken: req.session.sessionToken
          });
  
        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  router.post('/signup', function callee$0$0(req, res, next) {
    var username, password, newUser;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          username = req.body.username;
          password = req.body.password;
  
          if (!(username && password)) {
            context$1$0.next = 10;
            break;
          }
  
          newUser = new _parseNode2['default'].User();
  
          newUser.set("username", username);
          newUser.set("password", password);
          newUser.set("subscriptions", []);
          newUser.signUp(null, {
            success: function success(user) {
              console.log(user.get("sessionToken"));
              req.session.user = _UserUtil2['default'].UserToObject(user);
              req.session.sessionToken = user.get("sessionToken");
              res.status(200).send({ err: null, user: user });
            },
            error: function error(user, _error) {
              res.status(400).send({ err: _error, user: user });
            },
            sessionToken: req.session.sessionToken
          });
          context$1$0.next = 11;
          break;
  
        case 10:
          return context$1$0.abrupt('return', res.status(400).send({ err: { msg: "Need username and password" } }));
  
        case 11:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  router.get('/whoami', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          res.status(200).send(req.session.user);
  
        case 1:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  router.post('/login', function callee$0$0(req, res, next) {
    var username, password;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          username = req.body.username;
          password = req.body.password;
  
          if (!(username && password)) {
            context$1$0.next = 6;
            break;
          }
  
          _parseNode2['default'].User.logIn(username, password, {
            success: function success(user) {
              console.log("User loging in", user);
              req.session.user = _UserUtil2['default'].UserToObject(user);
  
              req.session.sessionToken = user.get("sessionToken");
  
              res.status(200).send({ err: null, user: user });
            },
            error: function error(user, _error2) {
              console.log("here");
              res.status(400).send({ err: _error2, user: user });
            },
            sessionToken: req.session.sessionToken
          });
          context$1$0.next = 7;
          break;
  
        case 6:
          return context$1$0.abrupt('return', res.status(400).send({ err: { msg: "Need username and password" } }));
  
        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  router.post('/logout', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          req.session.destroy();
          res.status(200).send("Logged out");
  
        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  router.param('username', function callee$0$0(req, res, next, username) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          req.username = username;
          next();
  
        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  router.get('/:username', function callee$0$0(req, res, next) {
    var query;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          query = new _parseNode2['default'].Query(_parseNode2['default'].User);
  
          query.equalTo("username", req.username);
          query.find({
            success: function success(results) {
              return res.status(200).send(results);
            },
            error: function error(deck, _error3) {
              return res.status(400).send({ err: _error3, deck: deck });
            },
            sessionToken: req.session.sessionToken
          });
  
        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  //Expects [transactions] TODO deal with Fork
  
  //Expects [transactions] TODO deal with Fork
  //TODO make stransaction method
  router.post('/:username', function callee$0$0(req, res, next) {
    var current_id, transactions, parsedTransactions;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          current_id = req.username;
  
          if (!(!req.body.isArray && !(req.body.length > 0))) {
            context$1$0.next = 3;
            break;
          }
  
          return context$1$0.abrupt('return', res.status(400).send({ err: "Must send array of transactions" }));
  
        case 3:
          transactions = req.body.map(function (body) {
            var t = new _parseNode2['default'].Object("Transaction");
            return TransactionUtil.fromRequestBody(t, body);
          });
          parsedTransactions = [];
  
          transactions.forEach(function (t) {
            console.log("here5");
            t.set("on", current_id);
            t.save(null, {
              success: function success(trans) {
                //TODO maintain order
  
                parsedTransactions.push({ transaction: trans, error: null });
                if (parsedTransactions.length == transactions.length) {
                  res.status(200).send(parsedTransactions);
                }
              },
              error: function error(trans, _error4) {
  
                parsedTransactions.push({ transaction: trans, error: _error4 });
                if (parsedTransactions.length == transactions.length) {
                  res.status(400).send(parsedTransactions);
                }
              },
              sessionToken: req.session.sessionToken
            });
          });
  
        case 6:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  exports['default'] = router;
  module.exports = exports['default'];

  //console.log("IN get all decks")

/***/ },
/* 96 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _parseNode = __webpack_require__(91);
  
  var _parseNode2 = _interopRequireDefault(_parseNode);
  
  var Transaction = _parseNode2["default"].Object.extend("Transaction", {
    validate: function validate() {
      return this.query, this.on;
    }
  }, {});
  
  exports["default"] = Transaction;
  var TransactionUtil = {
    fromRequestBody: function fromRequestBody(t, body) {
      t.set("query", body.query);
      t.set("data", body.data || {});
  
      return t;
    } };
  exports.TransactionUtil = TransactionUtil;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  //Register todos with aws dynammodb.
  //https://github.com/yortus/asyncawait
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _bluebird = __webpack_require__(96);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _express = __webpack_require__(3);
  
  var _DeckModel = __webpack_require__(99);
  
  var _DeckModel2 = _interopRequireDefault(_DeckModel);
  
  var _transactionsTransactionModel = __webpack_require__(97);
  
  var _transactionsTransactionModel2 = _interopRequireDefault(_transactionsTransactionModel);
  
  var Parse = __webpack_require__(91);
  
  var router = new _express.Router();
  
  router.get('/', function callee$0$0(req, res, next) {
    var query;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          query = new Parse.Query(_DeckModel2['default']);
  
          if (req.query.keywords) {
            query.containsAll("keywords", req.query.keywords);
          }
          if (req.query.name) {
            query.contains("name", req.query.name);
          }
          if (req.query.cids) {
            query.containsAll("cids", req.query.cids);
          }
          if (req.query.owner) {
            query.equalTo("owner", req.query.user);
          }
          if (req.query.gid) {
            query.equalTo("gid", req.query.gid);
          }
          query.limit(req.query.limit || 20);
          //console.log(query)
          query.find({
            success: function success(results) {
              console.log("Succssfully retrieved ", results, results.map(function (d) {
                return d.get("owner");
              }));
              return res.status(200).send(results.map(function (d) {
                return _DeckModel.DeckUtil.toObject(d);
              }));
            },
            error: function error(err) {
              //console.log("Failed to get decks ", err);
              return res.status(400).send(err);
            },
            sessionToken: req.session.sessionToken
          });
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  //If deck exist update it. Uses session names
  router.post('/', function callee$0$0(req, res, next) {
    var query;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          query = new Parse.Query(_DeckModel2['default']);
  
          if (!(!req.body.gid && !req.body.did)) {
            context$1$0.next = 3;
            break;
          }
  
          return context$1$0.abrupt('return', res.status(400).send({ err: "Must have a did or gid" }));
  
        case 3:
          if (req.body.gid) {
            query.equalTo("gid", req.body.gid);
          } else if (req.body.did) {
            query.equalTo("gid", req.session.user.username + ':' + req.body.did);
          }
          query.find({
            success: function success(results) {
  
              console.log("recieveing decks", results);
              var creatingDeck = !!results[0];
              var newDeck = results[0] || new Parse.Object("Deck");
              //console.log("here4", results)
              newDeck = _DeckModel.DeckUtil.fromRequestBody(newDeck, req.body);
              var gid = req.body.gid || req.session.user.username + ":" + req.body.did;
              var did = Number(gid.split(":")[1]);
              newDeck.set("gid", gid);
              newDeck.set("did", did);
              newDeck.set("owner", req.session.user.username);
              console.log("Making a new deck", did, gid);
              newDeck.save(null, {
                success: function success(deck) {
  
                  //    console.log("here3")
                  //Associate Deck with User
                  if (creatingDeck) {
                    var userQuery = new Parse.Query(Parse.User);
                    userQuery.equalTo("username", req.session.user.username);
                    userQuery.find({
                      success: function success(user) {
                        user.add("decks", deck);
                        user.save();
                      }
                    });
                  }
                  return res.status(200).send(_DeckModel.DeckUtil.toObject(deck));
                },
                error: function error(deck, _error) {
                  //  console.log(newDeck);
                  return res.status(400).send({ err: _error, deck: _DeckModel.DeckUtil.toObject(deck) });
                },
                sessionToken: req.session.sessionToken
              });
            },
            error: function error(err) {
  
              return res.status(500).send({ err: err, deck: {} });
            },
            sessionToken: req.session.sessionToken
          });
  
        case 5:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  router.param('gid', function callee$0$0(req, res, next, gid) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          req.gid = gid;
          next();
  
        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  router.get('/:gid', function callee$0$0(req, res, next) {
    var query;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          query = new Parse.Query(_DeckModel2['default']);
  
          query.equalTo("gid", req.gid);
          query.find({
            success: function success(results) {
              return res.status(200).send(results.map(function (d) {
                return _DeckModel.DeckUtil.toObject(d);
              }));
            },
            error: function error(deck, _error2) {
              return res.status(400).send({ err: _error2, deck: _DeckModel.DeckUtil.toObject(deck) });
            },
            sessionToken: req.session.sessionToken
          });
  
        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  //Expects [transactions] TODO deal with Fork
  router.post('/:gid', function callee$0$0(req, res, next) {
    var current_id, transactions, parsedTransactions;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          current_id = req.gid;
  
          if (!(!req.body.isArray && !(req.body.length > 0))) {
            context$1$0.next = 3;
            break;
          }
  
          return context$1$0.abrupt('return', res.status(400).send({ err: "Must send array of transactions" }));
  
        case 3:
          transactions = req.body.map(function (body) {
            var t = new Parse.Object("Transaction");
            return _transactionsTransactionModel.TransactionUtil.fromRequestBody(t, body);
          });
          parsedTransactions = [];
  
          transactions.forEach(function (t, index) {
            t.set("on", current_id);
            t.set("owner", req.session.get("username"));
            t.set("localIndex", index);
            t.save(null, {
              success: function success(trans) {
                //TODO maintain order or not
  
                parsedTransactions.push({ transaction: trans, error: null });
                if (parsedTransactions.length == transactions.length) {
                  res.status(200).send(parsedTransactions);
                }
              },
              error: function error(trans, _error3) {
  
                parsedTransactions.push({ transaction: trans, error: _error3 });
                if (parsedTransactions.length == transactions.length) {
                  res.status(400).send(parsedTransactions);
                }
              },
              sessionToken: req.session.sessionToken
            });
          });
  
        case 6:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

  //console.log("IN get all decks")

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _parseNode = __webpack_require__(91);
  
  var _parseNode2 = _interopRequireDefault(_parseNode);
  
  var Deck = _parseNode2["default"].Object.extend("Deck", {
    validate: function validate() {
      return true;
    }
  }, {//class methods
  
  });
  exports["default"] = Deck;
  var DeckUtil = {
    fromRequestBody: function fromRequestBody(deck, body) {
  
      deck.set("name", body.name);
      deck.set("keywords", body.keywords || "");
      deck.set("desc", body.desc || "");
      deck.set("newCards", body.newCards || []);
      deck.set("isPublic", body.isPublic || true);
      deck.set("children", body.children || []);
      deck.set("subscribers", body.subscribers || []);
      return deck;
    },
    toObject: function toObject(deck) {
      return {
        name: deck.get("name"),
        owner: deck.get("owner"),
        keywords: deck.get("keywords"),
        desc: deck.get("desc"),
        newCards: deck.get("newCards"),
        ispublic: deck.get("isPublic"),
        children: deck.get("children"),
        subscribers: deck.get("subscribers"),
        cids: deck.get("cids"),
        gid: deck.get("gid"),
        did: deck.get("did")
      };
    }
  };
  exports.DeckUtil = DeckUtil;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _bluebird = __webpack_require__(96);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _express = __webpack_require__(3);
  
  var _CardModel = __webpack_require__(101);
  
  var _CardModel2 = _interopRequireDefault(_CardModel);
  
  var _transactionsTransactionModel = __webpack_require__(97);
  
  var _transactionsTransactionModel2 = _interopRequireDefault(_transactionsTransactionModel);
  
  var Parse = __webpack_require__(91);
  
  var router = new _express.Router();
  
  router.get('/', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          //console.log("IN get all Cards")
          if (req.query.keywords) {
            query.containsAll("keywords", req.query.keywords);
          }
          if (req.query.tags) {
            query.contains("tags", req.query.tags);
          }
          if (req.query.notes) {
            query.containsAll("notes", req.query.notes);
          }
          if (req.params.cid) {
            query.equalTo("cid", req.query.cid);
          }
  
          if (req.params.username) {
            query.equalTo("cid", req.query.username);
          }
  
          if (req.params.gid) {
            query.equalTo("gid", req.query.gid);
          }
          console.log(query);
          query.find({
            success: function success(results) {
              console.log("Succssfully retrieved ", results);
              return res.status(200).send(results);
            },
            error: function error(err) {
              console.log("Failed to get Cards ", err);
              return res.status(400).send(err);
            },
            sessionToken: req.session.sessionToken
          });
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  //Todo check for username
  router.post('/', function callee$0$0(req, res, next) {
    var query;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          query = new Parse.Query(_CardModel2['default']);
  
          if (!(!req.body.gid && !req.body.did)) {
            context$1$0.next = 3;
            break;
          }
  
          return context$1$0.abrupt('return', res.status(400).send({ err: "Must have a did or gid" }));
  
        case 3:
          if (req.body.gid) {
            query.equalTo("gid", req.body.gid);
          }
          if (req.body.did) {
            query.equalTo("did", req.body.did);
          }
          console.log("here1");
          query.find({
            success: function success(results) {
  
              console.log("here2");
              var newCard = results[0] || new Parse.Object("Card");
              console.log("here4", results);
              newCard = _CardModel.CardUtil.fromRequestBody(newCard, req.body);
              newCard.save(null, {
                success: function success(Card) {
  
                  console.log("here3");
                  return res.status(200).send(Card);
                },
                error: function error(Card, _error) {
                  console.log(newCard);
                  return res.status(400).send({ err: _error, Card: Card });
                },
                sessionToken: req.session.sessionToken
              });
            },
            error: function error(err) {
  
              return res.status(400).send({ err: err, Card: {} });
            },
            sessionToken: req.session.sessionToken
          });
  
        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  router.param('gid', function callee$0$0(req, res, next, gid) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          req.gid = gid;
          next();
  
        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  router.get('/:gid', function callee$0$0(req, res, next) {
    var query;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          query = new Parse.Query(_CardModel2['default']);
  
          query.equalTo("gid", req.gid);
          query.find({
            success: function success(results) {
              return res.status(200).send(results);
            },
            error: function error(Card, _error2) {
              return res.status(400).send({ err: _error2, Card: Card });
            },
            sessionToken: req.session.sessionToken
          });
  
        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  //Expects [transactions] TODO deal with Fork
  router.post('/:gid', function callee$0$0(req, res, next) {
    var current_id, transactions, parsedTransactions;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          current_id = req.gid;
  
          if (!(!req.body.isArray && !(req.body.length > 0))) {
            context$1$0.next = 3;
            break;
          }
  
          return context$1$0.abrupt('return', res.status(400).send({ err: "Must send array of transactions" }));
  
        case 3:
          console.log("here1");
          transactions = req.body.map(function (body) {
            console.log("here2");
            var t = new Parse.Object("Transaction");
            console.log("here3");
            return _transactionsTransactionModel.TransactionUtil.fromRequestBody(t, body);
          });
  
          console.log("here4");
          parsedTransactions = [];
  
          transactions.forEach(function (t) {
            console.log("here5");
            t.set("on", current_id);
            t.save(null, {
              success: function success(trans) {
                //TODO maintain order
  
                parsedTransactions.push({ transaction: trans, error: null });
                if (parsedTransactions.length == transactions.length) {
                  res.status(200).send(parsedTransactions);
                }
              },
              error: function error(trans, _error3) {
  
                parsedTransactions.push({ transaction: trans, error: _error3 });
                if (parsedTransactions.length == transactions.length) {
                  res.status(400).send(parsedTransactions);
                }
              },
              sessionToken: req.session.sessionToken
            });
          });
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _parseNode = __webpack_require__(91);
  
  var _parseNode2 = _interopRequireDefault(_parseNode);
  
  var Card = _parseNode2["default"].Object.extend("Card", {
    validate: function validate() {
      return true; //Handled parse side
    }
  }, {//class methods
  
  });
  exports["default"] = Card;
  var CardUtil = {
    fromRequestBody: function fromRequestBody(card, body) {
      card.set("cid", body.cid);
      card.set("did", body.did);
      card.set("front", body.front);
      card.set("keywords", body.keywords);
      card.set("back", body.back);
      card.set("tags", body.tags);
      card.set("notes", body.notes);
      card.set("owner", body.owner);
  
      return card;
    }
  };
  exports.CardUtil = CardUtil;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  //Register todos with aws dynammodb.
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _bluebird = __webpack_require__(96);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _express = __webpack_require__(3);
  
  var running_id = 0;
  
  var Todo = function Todo() {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? { name: "default", description: "default" } : arguments[0];
  
    _classCallCheck(this, Todo);
  
    this.name = obj.name;
    this.description = obj.description;
    this.id = running_id++;
  }
  
  //Might as well make it more complicated than it needs to be.
  ;
  
  var populateTodos = function populateTodos() {
    var t = [{
      name: "test1",
      description: "Testing jade"
    }, {
      name: "test2",
      description: "Testing node"
    }];
    return t.map(function (item) {
      return new Todo(item);
    });
  };
  
  var todos = populateTodos();
  
  var getAllTodos = function getAllTodos() {
    return todos;
  };
  
  var router = new _express.Router();
  
  router.get('/all', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          res.status(200).send(getAllTodos());
  
        case 1:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fs = __webpack_require__(104);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(2);
  
  var _express = __webpack_require__(3);
  
  var _bluebird = __webpack_require__(96);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(105);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(106);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseJade = function parseJade(path, jadeContent) {
    var fmContent = (0, _frontMatter2['default'])(jadeContent);
    var htmlContent = _jade2['default'].render(fmContent.body);
    //combines objects into one.
    return Object.assign({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2['default'].promisify(_fs2['default'].readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2['default'](function (resolve) {
      _fs2['default'].exists(filename, resolve);
    });
  };
  
  var router = new _express.Router();
  
  router.get('/', function callee$0$0(req, res, next) {
    var path, fileName, source, content;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          path = req.query.path;
  
          console.log(path);
  
          if (!(!path || path === 'undefined')) {
            context$1$0.next = 6;
            break;
          }
  
          res.status(400).send({ error: 'The \'path\' query parameter cannot be empty.' });
          return context$1$0.abrupt('return');
  
        case 6:
          fileName = (0, _path.join)(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
  
          console.log(fileName);
          context$1$0.next = 10;
          return regeneratorRuntime.awrap(fileExists(fileName));
  
        case 10:
          if (context$1$0.sent) {
            context$1$0.next = 12;
            break;
          }
  
          fileName = (0, _path.join)(CONTENT_DIR, path + '/index.jade');
  
        case 12:
          context$1$0.next = 14;
          return regeneratorRuntime.awrap(fileExists(fileName));
  
        case 14:
          if (context$1$0.sent) {
            context$1$0.next = 18;
            break;
          }
  
          res.status(404).send({ error: 'The page \'' + path + '\' is not found.' });
          context$1$0.next = 23;
          break;
  
        case 18:
          context$1$0.next = 20;
          return regeneratorRuntime.awrap(readFile(fileName, { encoding: 'utf8' }));
  
        case 20:
          source = context$1$0.sent;
          content = parseJade(path, source);
  
          //Passed to routes.js.
          res.status(200).send(content);
  
        case 23:
          context$1$0.next = 28;
          break;
  
        case 25:
          context$1$0.prev = 25;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 28:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 25]]);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 106 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map