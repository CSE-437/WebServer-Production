import Parse from 'parse/node';


var Card = Parse.Object.extend("Card",{
  validate: function(){
    return(true) //Handled parse side
  }
},{//class methods

});
export default Card;
export const CardUtil = {
  fromRequestBody: function(card, body){
    card.set("cid", body.cid);
    card.set("did", body.did);
    card.set("front", body.front);
    card.set("keywords", body.keywords);
    card.set("back", body.back);
    card.set("tags", body.tags);
    card.set("notes", body.notes);
    card.set("owner", body.owner);

    return card;
  }
}
