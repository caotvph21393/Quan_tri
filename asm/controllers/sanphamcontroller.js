
const e = require('express');
var myMD=require('../models/asm');
var UMD=require('../models/usermodel')
var fs=require('fs');
const { log } = require('console');



exports.getListsp=async(req,res,next)=>{
    let tim_teo_ten=null;
    if(typeof(req.query.ten)!='undefined'){
        tim_teo_ten={ten:req.query.ten}
        
    }

    let list=await myMD.spModel.find(tim_teo_ten).populate('the_loai');
    let listTL=await myMD.tlModel.find();
    
    console.log(list);
    res.render('sanpham/list',{list:list,listTL:listTL});
}
exports.delsp=async(req,res,next)=>{
    await myMD.spModel.deleteOne({_id:req.params.idPro})
    res.redirect('/sp')
}
exports.delUser=async(req,res,next)=>{
    await UMD.userrModel.deleteOne({_id:req.params.idPro})
    res.redirect('/sp/listuser')
}
exports.delTL=async(req,res,next)=>{
    await myMD.tlModel.deleteOne({_id:req.params.idPro})
    res.redirect('/sp/theloai')
}

exports.getAddsp=async(req,res,next)=>{
    let msg="";
    let listTL=await myMD.tlModel.find();
    

    if(req.method=='POST'){
        console.log(req.body)
        //tao model
        let objSP=new myMD.spModel();
        objSP.ten=req.body.ten;
        objSP.gia=req.body.gia;
        objSP.mo_ta=req.body.mo_ta;
        objSP.anh=req.body.anh;
        objSP.the_loai=req.body.the_loai;
        //gi vao csdl
        try {
            let new_sp=await objSP.save();
            console.log(new_sp);
            // alert('thêm mới thành công')
            msg='thêm thành công'
            
           

            
        } catch (error) {
            // alert('lỗi thêm mới')
            msg='thêm bị lỗi'+ error.message;
            console.log(error);
        }

    }
    

    res.render('sanpham/add',{msg:msg,listTL:listTL});
}
exports.getEditsp=async(req,res,next)=>{
    let msg='';
    let idsp=req.params.idsp;
    //lay thong tin sp
    let objSP=await myMD.spModel.findById(idsp);
    let listTL=await myMD.tlModel.find();
    if (req.method=='POST') {
        let objSP=new myMD.spModel();
        objSP.ten=req.body.ten;
        objSP.gia=req.body.gia;
        objSP.mo_ta=req.body.mo_ta;
        objSP.anh=req.body.anh;
        objSP.the_loai=req.body.the_loai;
        
        objSP._id=idsp;
        try {
            await myMD.spModel.findByIdAndUpdate(idsp,objSP);
            msg='đã sửa thành công'
            return res.redirect('/sp')
        } catch (error) {
            msg='lỗi'+error.message;
            console.log(error);
        }
    }
    

    res.render('sanpham/edit',{msg:msg,listTL:listTL,objSP:objSP})
}

exports.getListUser=async(req,res,next)=>{
    
    
    let listuser =await UMD.userrModel.find();
    console.log(listuser);
    res.render('sanpham/listuser',{listuser:listuser});
}
exports.getAddUser=async(req,res,next)=>{
    let msg="";
    if(req.method=='POST'){
        console.log(req.body)
        //tao model
        if(req.body.password !=req.body.password2){
            msg='sai pass'
            //sai pass thoat ra khoi ham
            return  res.render('sanpham/adduser',{msg:msg});
        }
        
        
        //gi vao csdl
        try {
            let objU=new UMD.userrModel();
        objU.user_name=req.body.user_name;
        objU.email=req.body.email;
        objU.password=req.body.password;
            objU=await objU.save();
            console.log();
            // alert('thêm mới thành công')
            msg='thêm thành công'
        } catch (error) {
            // alert('lỗi thêm mới')
            msg='thêm bị lỗi'+ error.message;
            console.log(error);
        }

    }
    res.render('sanpham/adduser',{msg:msg})
}
exports.getEdituser=async(req,res,next)=>{
    let msg=''
    let idU=req.params.idU;
    let objU=await UMD.userrModel.findById(idU)
    if(req.method=='POST'){
        let objU=new UMD.userrModel();
        objU.user_name=req.body.user_name;
        objU.password=req.body.password
        objU.email=req.body.email;
        objU._id=idU;
        try{
            await UMD.userrModel.findByIdAndUpdate(idU,objU)
            res.redirect('/sp/listuser')
        }catch(err){
            console.log(err);
        }
    }
    res.render('sanpham/edituser',{objU:objU,msg:msg})
}

exports.getChitietr=async(req,res,next)=>{
    let msg='';
    let idsp=req.params.idsp;
    //lay thong tin sp
    let objSP=await myMD.spModel.findById(idsp);
    let listTL=await myMD.tlModel.find();
    
       
    
    

    res.render('sanpham/chitiet',{msg:msg,listTL:listTL,objSP:objSP})
}
exports.getChitiet = async (req,res, next) => {
    let idsp = req.params.idsp;
  
    //lấy id
    let objSP = await myMD.spModel.findById(idsp).populate('the_loai');
    let listTL = await myMD.tlModel.find();
  
    let objspct = new myMD.spModel();
    objspct._id = idsp;
  
  
    let ct = await myMD.spModel.find().populate('the_loai');
  
    res.render('sanpham/chitiet', {objSP:objSP,listTL:listTL,ct:ct});
  }
  exports.getTheLoai=async(req,res,next)=>{
    if(req.method=='POST'){
        console.log(req.body)
        //tao model
        
        
        
        //gi vao csdl
        try {
            let objTL=new myMD.tlModel();
        objTL.ten=req.body.ten;
        
            objTL=await objTL.save();
            console.log();
            // alert('thêm mới thành công')
            msg='thêm thành công'
        } catch (error) {
            // alert('lỗi thêm mới')
            msg='thêm bị lỗi'+ error.message;
            console.log(error);
        }

    }

    let listTL=await myMD.tlModel.find();
    res.render('sanpham/theloai',{listTL:listTL})
  }
exports.getEditTL=async(req,res,next)=>{
    let msg='';
    let idPro=req.params.idPro;
    //lay thong tin sp
    
    let objSP=await myMD.tlModel.findById(idPro);
    if (req.method=='POST') {
        let objSP=new myMD.tlModel();
        objSP.ten=req.body.ten;
        

        objSP._id=idPro;
        try {
            await myMD.tlModel.findByIdAndUpdate(idPro,objSP);
            msg='đã sửa thành công'
           return res.redirect('/sp/theloai')
        } catch (error) {
            msg='lỗi'+error.message;
            console.log(error);
        }
    }


    res.render('sanpham/edittl',{msg:msg,objSP:objSP})
}



