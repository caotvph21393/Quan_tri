var express = require('express');
var router = express.Router();
var indexCTL=require('../controllers/logincontroller')
var checkk=require('../middleware/middleware');


router.use((req,res,next)=>{
    console.log('----goi vao middleware');
    next();
  })
  
router.get('/',checkk.yc_dn,function(req,res,next){
    let userLogin=req.session.userLogin;
    res.send(userLogin)
})
router.get('/login',indexCTL.getLogin)
router.post('/login',indexCTL.getLogin)

router.get('/create',indexCTL.getCteatnew)
router.post('/create',indexCTL.getCteatnew)

module.exports = router;

