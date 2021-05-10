const {Router} = require('express');
const mysql=require('mysql');
const router=Router()
const db = require('../config/db.conn')

// /api/notauf/fitzone
router.get(
    '/fitzone',
    async (req, res) => {
        try{
            const zanytie="SELECT zanytie.idzanytie, zanytie.idtrenera, zanytie.datetime, zanytie.numberzal, zanytie.nazvanie,zanytie.img, zanytie.opisaniepodrobno FROM fit.zanytie;"
            db.query(zanytie, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })

router.get(
    '/fitzonetreners',
    async (req, res) => {
        try{
            const trener=`SELECT trener.idtrener,trener.stag,trener.kategory,trener.opisanie,trener.citat, trenersdata.FIO_cl as fio_trener, trenersdata.img, trenersdata.Phone as phone FROM fit.trener 
JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener;`
            db.query(trener, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })

module.exports=router