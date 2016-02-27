import Parse from 'parse/node';


const Transaction = Parse.Object.extend("Transaction", {
  validate : function(){
    return (this.query, this.on)
  }
},{
  fromRequestBody : function(body){
    var t = new Transaction();
    t.set("query", body.query);
    t.set("data", body.data);

    return t;
  }
})

export default Transaction;
