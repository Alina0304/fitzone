const {Router} = require('express');
const router=Router()
const dateFormat = require('dateformat');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')
const mailer=require('../config/nodemailer')

let idpt=0
// /api/nouting/noutigpt

router.get(
    '/noutingpt',
    async (req, res) => {
        try{
                const trenerovki=`SELECT zanytie.idzanytie,zanytie.nazvanie,zanytie.opisanie,DATE_FORMAT(zanytie.datetime,'%Y-%m-%d %H:%i') AS datetime,zanytie.opisaniepodrobno, trenersdata.FIO_cl as fio_trener, trener.idtrener, zanytie.img 
FROM fit.zanytie JOIN fit.trener ON fit.zanytie.idtrenera=fit.trener.idtrener
JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener;`
            db.query(trenerovki, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);
                res.json({result});
            });
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
router.post(
    '/inserting/:id',auth,
    async (req, res)=>{
        console.log("Email Нужный",req.body.curEmail);
        let values=[+req.params.id,req.body.idtrener,dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"),req.body.idzanytie]
        try {
            console.log("values", values)
            const insertPt = "INSERT INTO fit.personaltren(idclent, idtrener, datatime, idzan) VALUES (?,?,?,?);"
            db.query(insertPt, values, (err, result) => {
                console.log("Error", err)
                console.log("Результат выборки", result);
                res.json({result});
                idpt=result.insertId
                const message = {
                    to: req.body.curEmail,
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
            '/insertingtwo/:id',
            async (req, res)=> {
                try {
                    const insertPay = "INSERT INTO fit.paypersonaltren(idclient, idtrener, idtrenerovki) VALUES (?,?,?);"
                    db.query(insertPay, [+req.params.id, req.body.idtrener, idpt], (err, result) => {
                        console.log("Error", err)
                        console.log("Результат выборки", result);
                    });
                } catch (e) {
                    return res.status(400).json({message: 'Ответил'})
                }
            }
        )



    }
)
router.post(
    '/selecttrenerpt',
    async (req, res) => {
        let date=dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM")
        let values=+req.body.idtrener
       // console.log("Значения",values);
        //console.log("Дата", dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"))
        try{
           const timeday="SELECT COUNT(DATE_FORMAT(datatime, '%Y-%m-%d %H:%i')) as counts from fit.personaltren where idtrener=? and DATE_FORMAT(datatime,'%Y-%m-%d %H:%i') = DATE_FORMAT(?, '%Y-%m-%d %H:%i');"
            db.query(timeday, [values, date],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result[0].counts);
                let resultCount=result[0].counts
                res.json({resultCount});
            });
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })

router.get(
    '/selectsum',
    async (req, res) => {
        try{
            const trenerovki=`SELECT zanytie.idzanytie,zanytie.nazvanie,zanytie.opisanie,DATE_FORMAT(zanytie.datetime,'%Y-%m-%d %H:%i') AS datetime,zanytie.opisaniepodrobno, trenersdata.FIO_cl as fio_trener, trener.idtrener, zanytie.img 
FROM fit.zanytie JOIN fit.trener ON fit.zanytie.idtrenera=fit.trener.idtrener
JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener;`
            db.query(trenerovki, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);
                res.json({result});
            });
        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
module.exports=router