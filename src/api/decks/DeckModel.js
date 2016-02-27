import Parse from 'parse/node';


var Deck = Parse.Object.extend("Deck",{
  validate: function(){
    return (this.did && this.dec && this.cids && this.owner && this.children && this.subscribers)
  }
},{//class methods
  fromRequestBody: function(body){
    var deck = new Deck();
    deck.set("did", body.did);
    deck.set("desc", body.desc);
    deck.set("cids", body.cids);
    deck.set("owner", body.owner);
    deck.set("children", body.children);
    deck.set("subscribers", body.subscribers);
    return deck;
  }
});
export default Deck;
