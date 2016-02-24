/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles'; //Applies custmo style
import s from './TodoPage.scss'; //Import custom styles
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';
import Link from '../Link'

const title = 'Stuff Todo'; //page title

@withStyles(s) //sets styles.
class TodoPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  //Constroctor for class.
  //REMEBER props and state are two different things.
  //databinding uses props.
  constructor(props){
    super(props);
    this.state = TodoStore.getState();
    //need to use bind so that the this variable for onChange
    //refers to this TodoPage object not the function
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  //Alwasy call
  componentDidMount(){
    //makes the TodoStore call the onchange function whenever it cnanges.
    //This is why we had to use bind
    TodoStore.listen(this.onChange);
    //As soon as it is poling for data get data
    TodoActions.getTodos();
  }

  componentWillUnmount(){
    //remove event listener
    TodoStore.unlisten(this.onChange);
  }

  //simply sets the state whenever the todo store changes
  onChange(state){
    this.setState(state);
    console.log(this.getState)
  }


  render() {
    let todos = this.state.todos.map((todo) =>{
      return (
        <li key={todo.id}>
          <a href={'/todo/'+todo.id} onClick={Link.handleClick}>{todo.name}</a>
          <p>{todo.description}</p>
        </li>
      )
    });
    //Render component
    return (
      <div className={s.root}> //Sets the root class
        <div className={s.container}> //sets the container style
          <h1>{title}</h1> //one way databinding
          //for loop to draw all of the todos
          {todos}
          <p>Try to complete the aboe todos</p>
        </div>
      </div>
    );
  }

}

export default TodoPage;
