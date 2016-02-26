//Register todos with aws dynammodb.
import Promise from 'bluebird'; import {Router} from 'express';

var running_id = 0

class Profile{ constructor(obj = {name: "default", description: "default"}){ this.name = obj.name; this.description = obj.description; this.id = running_id++; } }

const populateDecks = ()=>{ let t = [ { name:"test1", description: "Testing jade" }, { name:"test2", description: "Testing node" } ]; return t.map((item)=>{return new Profile(item)}) }

var decks = populateDecks()

const getAllDecks = ()=>{ return decks }

const router = new Router();

router.get('/all', async(req, res,next)=>{ res.status(200).send(getAllDecks()) });

export default router;
