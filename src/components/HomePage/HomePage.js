


import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles'; //Applies custmo style
import s from './HomePage.scss'; //Import custom styles
import Link from '../Link'

//import DeckList from '../DeckLib/DeckList';

const title = 'Welcome to AnkiHub'; //page title

@withStyles(s) //sets styles.
class HomePage extends Component {

 static contextTypes = {
   onSetTitle: PropTypes.func.isRequired,
 };

 //Constroctor for class.
 //REMEBER props and state are two different things.
 //databinding uses props.
 constructor(props){
   super(props);

   this.onChange = this.onChange.bind(this);
 }

 componentWillMount() {
   this.context.onSetTitle(title);
 }

 //Alwasy call
 componentDidMount(){

 }

 componentWillUnmount(){

 }

 //simply sets the state whenever the Deck store changes
 onChange(state){
   this.setState(state);
 }


 render() {

   //Render component
   return (
     <h1>Hello</h1>
   );
 }

}

export default HomePage;
