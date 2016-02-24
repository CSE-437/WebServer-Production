//Register todos with aws dynammodb.
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

//Might as well make it more complicated than it needs to be.
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
