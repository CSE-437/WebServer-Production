
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
    deck.set("keywords", body.keywords || "");
    deck.set("desc", body.desc || "");
    deck.set("newCards", body.newCards || []);
    deck.set("isPublic", body.isPublic || true);
    deck.set("children", body.children || []);
    deck.set("subscribers", body.subscribers || []);
    return deck;
  },
  toObject: function(deck){
    return {
      name:deck.get("name"),
      owner:deck.get("owner"),
      keywords: deck.get("keywords"),
      desc: deck.get("desc"),
      newCards: deck.get("newCards"),
      ispublic: deck.get("isPublic"),
      children: deck.get("children"),
      subscribers: deck.get("subscribers"),
      cids: deck.get("cids"),
      gid: deck.get("gid"),
      did: deck.get("did")
    }
  }
}
