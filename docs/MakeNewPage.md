In this tutorial I will walk you through how I made the todo page.

#First in the components folder make a directory called TodoPage

In this folder create 3 files.
1. package.json. Handles versioning and specific npm modules for that page.
2. TodoPage.scss. Handles custom styling for that page.
3. TodoPage.js. Actual react component.

Here is what each file looks like initially

package.json
`{
  "name": "TodoPage",
  "version": "0.0.0",
  "private": true,
  "main": "./TodoPage.js"
}
`

TodoPage.scss
`/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

@import '../variables.scss';

.root {

}

.container {
  margin: 0 auto;
  padding: 0 0 40px;
  max-width: $max-content-width;
}
`

TodoPage.js

  `/**
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

  `
#Create enpoints for Todo.
We now need to two things.
1. Make sure our app is aware of the Todo page, and links to the Todo Page content.
2. Register the 'api/todo/all' endpoint for getting data.

##Register the Todo page.

In the contnet folder, create a file called todo.jade, and post the following content.
  `---
  title: Stuff ToDo
  component: TodoJade
  ---
  div
    div
      h3 Welcome to TODO

  `
The .jade is a templating engine. You can read more of it [here](http://jade-lang.com/tutorial/)

The lines between the --- are front-matter. They define custom
variables for this page like title and component that then
endpoint /api/content reads.

##Register the Todo api.
In server.js. post this line after the '/api/content'
  `server.use('/api/todo', require('./api/todo'));`

##Code the Todo api
Make ./api/todo

  `//Register todos with aws dynammodb.
  import Promise from 'bluebird';
  import {Router} from 'express';

  var running_id = 0
  class Todo{
    constructor(obj = {name: "default", description: "default"}){
      this.name = obj.name;
      this.description = obj.description;
      this.id = running_id++;
    }
  }

  const populateTodos = ()=>{
    let t = [
      {
        name:"test1",
        description: "Testing jade"
      },
      {
        name:"test2",
        description: "Testing node"
      }
    ]
    return t.map((item)=>{return new Todo(item)})
  }

  var todos = populateTodos()

  const getAllTodos = ()=>{
    return todos
  }

  const router = new Router();

  router.get('/all', async(req, res,next)=>{
    res.status(200).send(getAllTodos())
  });

  export default router;
  `
