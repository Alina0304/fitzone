const {Router} = require('express');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')
const router=Router()

// /api/payinfo/aboutclientabon
router.post(
    '/aboutclientabon',
    async (req, res) => {
        console.log(req.body.cl)
        try{
            const clientabons=` SELECT abonpay.id,account_kl.FIO_cl, aboninfo.srok, abonement.type, abonpay.summ AS oplacheno, aboninfo.summ AS sumkoplate FROM abonpay
JOIN account_kl ON abonpay.idclient=account_kl.id
JOIN  aboninfo ON aboninfo.id=abonpay.idabon
JOIN abonement ON abonement.id=aboninfo.id
WHERE abonpay.idclient=5;`
            db.query(clientabons, [req.body.cl],(err, result)=>{

                console.log(result)
                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.post(
    '/aboutclientpt',
    async (req, res) => {
        try{

            const admin=`SELECT trenersdata.FIO_cl AS fio_trener,
                personaltren.idpt AS id,personaltren.status,DATE_FORMAT(personaltren.datatime,'%d.%m.%Y %H:%i') AS datatime,zanytie.nazvanie, paypersonaltren.summ AS oplacheno, zanytie.sum AS sumkoplate FROM fit.account_kl AS clientsdata
            JOIN fit.personaltren ON clientsdata.id=personaltren.idclent
            JOIN fit.trener ON personaltren.idtrener=trener.idtrener
            JOIN fit.account_kl AS trenersdata ON trener.idtrener=trenersdata.id
            JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
            JOIN fit.paypersonaltren ON personaltren.idpay=paypersonaltren.idpaypt
            WHERE clientsdata.id=4 order by personaltren.datatime;`
            db.query(admin,[req.body.cl],(err, result)=>{
                console.log("Результат ", result)
                res.json({result});
            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.post(
    '/payabon',
    async (req, res) => {
        console.log("reqs",req.body)
        try{

            const payabon=`UPDATE abonpay SET summ=?, datepay=curdate() WHERE id=?;`
            db.query(payabon,[req.body.sumkoplate,req.body.id ],(err, result)=>{
                console.log("Результат ", result)
                res.json({result});
            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.post(
    '/paypt',
    async (req, res) => {
        console.log("reqs",req.body)
        try{

            const payabon=`UPDATE paypersonaltren SET summ=?, datepay=curdate() WHERE idpaypt=?;`
            db.query(payabon,[req.body.sumkoplate,req.body.id],(err, result)=>{
                console.log("Результат ", result)
                res.json({result});
            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })

module.exports=router