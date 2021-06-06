const {Router} = require('express');
const router=Router()
const dateFormat = require('dateformat');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')
const mailer=require('../config/nodemailer')

let idpt=0
let idpay=0


router.post('/insertingpt',
    async (req, res)=> {
        try {
            console.log('body', req.body)
            let em
            const email = "SELECT email FROM auth WHERE idauth=?"
            db.query(email, req.body.cl, (err, result) => {
                console.log("Результат выборки", result);
                em = result.email

                const insertPt = "INSERT INTO fit.personaltren(idclent, idtrener, datatime, idzan) VALUES (?,?,?,?);"
                db.query(insertPt, [req.body.cl, req.body.tren, dateFormat(req.body.selectedDate, "yyyy-mm-dd HH:MM:ss"), req.body.zan], (err, result) => {
                    console.log("Error", err)
                    console.log("Резльтат вставки", result);
                    idpt = result.insertId
                    const message = {
                        to: em,
                        subject: 'Запись на персональную тренировку прошшла успешно!',
                        text: `Вы запилсаись на персональную тренировку ${req.body.nazvanie} 
                    ${dateFormat(req.body.selectedDate, "yyyy-mm-dd HH:MM:ss")}
                    Хорошего дня!`

                    }
                    mailer(message)

                });
            });
        } catch (e) {
            return res.status(400).json({message: 'Ответил'})
        }
    }

)

router.post(
    '/inserting',
    async (req, res)=>{
        try{
            let em
        const email="SELECT email FROM auth WHERE idauth=?"
            db.query(email, req.body.cl, (err, result) => {
                console.log("Результат выборки", result);
                res.json({result});
                em=result.email
            });
        let values=[+req.params.id,req.body.idtrener,dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"),req.body.idzanytie]
            const insertPt = "INSERT INTO fit.personaltren(idclent, idtrener, datatime, idzan) VALUES (?,?,?,?);"
            db.query(insertPt, [req.body.cl,req.body.tren, req.body.dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"),req.body.zan], (err, result) => {
                console.log("Error", err)
                console.log("Результат выборки", result);
                res.json({result});
                idpt=result.insertId
                const message = {
                    to: em,
                    subject: 'Запись на персональную тренировку прошшла успешно!',
                    text: `Вы запилсаись на персональную тренировку ${req.body.nazvanie} 
                    ${dateFormat(req.body.selectedDate, "yyyy-mm-dd HH:MM:ss")}
                    Хорошего дня!`

                }
                mailer(message)

            });
        }
        catch (e) {
            return res.status(400).json({message:'Ответил'})
        }

 router.post(
            '/insertingtwo',
            async (req, res)=> {
                try {
                    const insertPay = "INSERT INTO fit.paypersonaltren(idclient, idtrener, datepay, idtrenerovki, summ) VALUES (?,?,now(),?, ?);"
                    db.query(insertPay, [req.body.cl, req.body.idtrener, idpt,req.body.sum], (err, result) => {
                        console.log("Error", err)
                        console.log("Результат выборки", result);
                        idpay=result.insertId
                    });
                } catch (e) {
                    return res.status(400).json({message: 'Ответил'})
                }
            }
        )



    }
)
router.post(
    '/insertingthree',
    async (req, res)=> {
        try {
            const insertPay = "UPDATE personaltren SET idpay=?;"
            db.query(insertPay, [idpay], (err, result) => {
                console.log("Error", err)
                console.log("Результат выборки", result);
            });
        } catch (e) {
            return res.status(400).json({message: 'Ответил'})
        }
    }
)

module.exports=router

