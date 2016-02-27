


import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles'; //Applies custmo style
import s from './DeckPage.scss'; //Import custom styles
import DeckStore from '../../stores/DeckStore';
import DeckActions from '../../actions/DeckActions';
import Link from '../Link'

const title = 'Stuff Deck'; //page title

@withStyles(s) //sets styles.
class DeckPage extends Component {

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
   this.context.onSetTitle(title);
 }

 //Alwasy call
 componentDidMount(){
   //makes the DeckStore call the onchange function whenever it cnanges.
   //This is why we had to use bind
   DeckStore.listen(this.onChange);
   //As soon as it is poling for data get data
   DeckActions.getDecks();
 }

 componentWillUnmount(){
   //remove event listener
   DeckStore.unlisten(this.onChange);
 }

 //simply sets the state whenever the Deck store changes
 onChange(state){
   this.setState(state);
   console.log(this.getState)
 }


 render() {
   let Decks = this.state.decks.map((Deck) =>{
     return (
       <li key={Deck.id}>
         <a href={'/Deck/'+Deck.id} onClick={Link.handleClick}>{Deck.name}</a>
         <p>{Deck.description}</p>
       </li>
     )
   });
   //Render component
   return (
     <div className={s.root}> //Sets the root class
       <div className={s.container}> //sets the container style
         <h1>{title}</h1> //one way databinding
         //for loop to draw all of the Decks
         {Decks}
         <p>Try to complete the aboe Decks</p>
       </div>
     </div>
   );
 }

}

export default DeckPage;
