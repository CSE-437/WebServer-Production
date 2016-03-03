
import Parse from 'parse/node';


var Deck = Parse.Object.extend("Deck",{
  validate: function(){
    return(true);
  }
},{//class methods

});
export default Deck;
export const DeckUtil = {
  fromRequestBody: function(deck, body){

    deck.set("name", body.name);
    deck.set("keywords", body.keywords);
    deck.set("desc", body.desc);
    deck.set("newCards", body.newCards);
    deck.set("ispublic", body.ispublic);
    deck.set("children", body.children);
    deck.set("subscribers", body.subscribers);
    return deck;
  }
}
