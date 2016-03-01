
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

    deck.set("did", body.did);
    deck.set("name", body.name);
    deck.set("keywords", body.keywords);
    deck.set("desc", body.desc);
    deck.set("cids", body.cids);
    deck.set("newCards", body.newCards);
    deck.set("owner", body.owner);
    deck.set("ispublic", body.ispublic);
    deck.set("children", body.children);
    deck.set("subscribers", body.subscribers);
    console.log(deck.get('did'))
    return deck;
  }
}
