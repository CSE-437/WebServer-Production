import dispatcher from '../core/Dispatcher';
import $ from 'jquery'

//Remember that this file runs on the client not the server
class TodoActions{
  constructor(){
    //Each of these actiosn will become a function
    this.generateActions(
      'getTodosSuccess',
      'getTodosFail'
    );
    console.log(this)
  }

  //Directly callled by TodoPage
  //R
  getTodos(){
    //Get all todos
    console.log(this)
    $.ajax({url: '/api/todo/all'})
      .done((data)=>{
        this.getTodosSuccess(data)
      })
      .fail((err)=>{
        this.getTodosFail(err)
      });
  }
}

export default dispatcher.createActions(TodoActions);
