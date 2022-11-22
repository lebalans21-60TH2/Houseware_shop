const { User } = require('./../models/user');

let authAdmin = (req,res,next) => {
    
    let token = req.cookies.ad_auth;

    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });

        req.token = token;
        req.user = user;
        next();
    })

}


module.exports = { authAdmin }