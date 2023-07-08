const {model}=require('mongoose');
var db=require('./db');
const spSchema=new db.monggoose.Schema(
    {

        ten:{type:String,require:true},
        gia:{type:Number,require:true},
        anh:{type:String,require:true},
        the_loai:{type:db.monggoose.Schema.Types.ObjectId,ref:'tlModel'},
        mo_ta:{type:String,require:true},
    },
    {
        collection:'san_pham'
    }
  
)
let spModel=db.monggoose.model('spModel',spSchema);
module.exports={spModel};



const tlChema=new db.monggoose.Schema(
{
    
    ten:{type:String,require:true}

},{
    collection:'the_loai'
}
);
let tlModel=db.monggoose.model('tlModel',tlChema);
module.exports={spModel,tlModel}