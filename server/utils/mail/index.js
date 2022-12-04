const mailer = require('nodemailer');
const { welcome } = require("./welcome_template");
const { purchase } = require("./purchase_template");
const { resetPass } = require("./resetpass_template");
require('dotenv').config();


const getEmailData = (to,name,token,template,actionData) =>{
    let data = null;

    switch(template){
        case "welcome":
            data = {
                from: "Warehouse Store",
                to,
                subject: `Chào mừng đến với Warehouse Store ${name}`,
                html: welcome()
            }
        break;
        case "purchase":
            data = {
                from: "Warehouse Store",
                to,
                subject: `Cảm ơn đã mua hàng tại Warehouse Store ${name}`,
                html: purchase(actionData)
            }
        break;
        case "reset_password":
            data = {
                from: "Warehouse Store",
                to,
                subject: `Xin chào ${name}, Đặt lại mật khẩu của bạn`,
                html: resetPass(actionData)
            }
        break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to,name,token,type,actionData = null) => {

    const smtpTransport = mailer.createTransport({
      
      
        service:"Gmail",
        auth:{
            user: "army24062000@gmail.com",
            pass: 'xrtjrbbuapcolcge'
        }
    });

    const mail = getEmailData(to,name,token,type,actionData)

    smtpTransport.sendMail(mail,function(error,response){
        if(error){
            console.log(error);
        } else {
            cb()
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }
