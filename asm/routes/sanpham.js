var express=require('express');

var router=express.Router();
var spCTL=require('../controllers/sanphamcontroller');
router.get('/',spCTL.getListsp);




router.get('/addsp',spCTL.getAddsp);
router.post('/addsp',spCTL.getAddsp);
router.get('/editsp/:idsp',spCTL.getEditsp);
router.post('/editsp/:idsp',spCTL.getEditsp);
router.get('/del/:idPro',spCTL.delsp);

router.get('/listuser/deluser/:idPro',spCTL.delUser);
router.get('/listuser/edituser/:idU',spCTL.getEdituser)
router.post('/listuser/edituser/:idU',spCTL.getEdituser)


router.post('/adduser',spCTL.getAddUser);
router.get('/adduser',spCTL.getAddUser)
router.get('/listuser',spCTL.getListUser)

router.get('/chitiet/:idsp',spCTL.getChitiet)

router.get('/theloai',spCTL.getTheLoai);
router.post('/theloai',spCTL.getTheLoai);

router.get('/theloai/del/:idPro',spCTL.delTL)
router.get('/theloai/edittl/:idPro',spCTL.getEditTL)
router.post('/theloai/edittl/:idPro',spCTL.getEditTL)


module.exports=router;