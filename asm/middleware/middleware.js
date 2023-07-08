exports.yc_dn=(req,res,next)=>{
    if (req.session.userLogin) {
        //da dang nhap
   next();
   }else{
       //dieu huong dang nhap
       res.redirect('/login');
   }
}