var UMD = require('../models/usermodel');


exports.getLogin = async (req, res, next) => {

    let msg = '';
    if (req.method == 'POST') {
        // lay thong tin dang nhap
        try {
            let objU = await UMD.userrModel.findOne({ user_name: req.body.user_name });
            console.log(objU);
            if (objU != null) {
                // ton taij user
                if (objU.password == req.body.password) {

                    req.session.userLogin = objU;
                    return res.redirect('/sp')
                } else {
                    msg = 'sai pass'
                }
            }else{
                msg='không tồn tại user'+req.body.user_name;
            }
            


        } catch (error) {
            msg=error.massage

        }

    }
    res.render('login/index',{msg:msg})
}
exports.getCteatnew = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        console.log(req.body);
        if (req.body.password != req.body.password2) {
            msg = 'mật khẩu không khớp';
            return res.render('login/create', { msg: msg })
        }
        try {
            let objU = new UMD.userrModel();
            objU.user_name = req.body.user_name;
            objU.email = req.body.email;
            objU.password = req.body.password;
            await objU.save();
            msg = 'đăng kí thành công'

        } catch (error) {
            msg = 'lỗi ' + error.maesage;

        }
    }

    res.render('login/create', { msg: msg })
}