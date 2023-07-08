
const monggoose=require('mongoose');
monggoose.connect('mongodb://127.0.0.1/asm')
.catch((err)=>{
    console.log('loi ket noi');
    console.log(err);
});
module.exports={monggoose}