import Parse from 'parse/node';


const Transaction = Parse.Object.extend("Transaction", {
  validate : function(){
    return (this.query, this.on)
  }
},{});

export default Transaction;
export const TransactionUtil = {
  fromRequestBody : function(t, body){
    t.set("query", body.query);
    t.set("data", body.data);

    return t;
}}
