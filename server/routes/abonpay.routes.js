const {Router} = require('express');
const dateFormat = require('dateformat');
const db = require('../config/db.conn')
const router=Router()

// /api/abonpay/
router.get(
    '/allclients',
    async (req, res) => {
        try{
            const clients=`SELECT account_kl.FIO_cl,account_kl.id from account_kl 
JOIN auth ON idauth=id where role='cl';`
            db.query(clients, [],(err, result)=>{

                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })

router.get(
    '/curclient/:id',
    async (req, res) => {
        try{
            const clients=`SELECT account_kl.FIO_cl from account_kl where account_kl.id=?;`
            db.query(clients, [req.params.id],(err, result)=>{

                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })

// /abonements

router.get(
    '/abonements',
    async (req, res) => {
        try{
            const clients=`SELECT id, type, opisanie FROM abonement;`
            db.query(clients, [],(err, result)=>{

                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.post(
    '/findnew',
    async (req, res) => {
        try{
            const clients=`SELECT id, summ FROM aboninfo WHERE idtype=? AND srok=?;`
            db.query(clients, [req.body.idabon, req.body.sr],(err, result)=>{

                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.post(
    '/updating',
    async (req, res)=>{
        console.log(req.body.idabon,dateFormat(req.body.date,"yyyy-mm-dd HH:MM:ss"),req.body.idcl)
        try{
            const updateAbon="INSERT INTO abonpay(idclient, idabon, summ, datepay, DateActivity) VALUES (?,?,?,?,?)"
            db.query(updateAbon, [req.body.idcl,req.body.idabon,req.body.summ,dateFormat(req.body.date,"yyyy-mm-dd HH:mm:ss"),dateFormat(req.body.sdate,"yyyy-mm-dd")],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });
        }
        catch (e) {
            return res.status(400).json({message:'Ответил pltcm'})
        }



    }
)
router.get(
    '/sroki',
    async (req, res) => {
        try{
            const clients=`SELECT DISTINCT srok FROM aboninfo;`
            db.query(clients, [],(err, result)=>{

                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })


module.exports=router