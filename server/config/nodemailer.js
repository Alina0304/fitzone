const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
    auth: {
        user: 'fitzone.sender@yandex.ru',
        pass: 'fitzone123456789'
    }
},
{
    from: 'FitZone <fitzone.sender@yandex.ru>',
}
)
const mailer=message=>{
    transporter.sendMail(message, (err, info)=>{
        if(err) return console.log(err)
        console.log("Email sent", info)
    })
}
module.exports=mailer