const {model}=require('mongoose');
var db=require('./db');
const userrSchema=new db.monggoose.Schema(
    {
        user_name:{type:String,require:true},
        email:{type:String,require:true},
        password:{type:String,require:true}
    },{ 
        collection:'user'
    }
)
let userrModel=db.monggoose.model('userrModel',userrSchema);
module.exports={userrModel};