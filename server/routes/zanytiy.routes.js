const {Router} = require('express');
const dateFormat = require('dateformat');
const router=Router()
const db = require('../config/db.conn')

// /api/trener/zanytiyPage
router.get(
    '/zanytiyPage',
    async (req, res) => {
        try{
            const zanytie=`SELECT zanytie.idzanytie, zanytie.idtrenera, zanytie.datetime, 
                           zanytie.numberzal, zanytie.nazvanie, zanytie.opisanie,zanytie.opisaniepodrobno,
                           zanytie.img, trener.idtrener, account_kl.FIO_cl as fio_trener
                            FROM zanytie JOIN trener ON zanytie.idtrenera=trener.idtrener
                            JOIN account_kl ON trener.idtrener=account_kl.id;`
            db.query(zanytie, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
router.post(
    '/zanytiyPage',
    async (req, res)=>{
        console.log("req.body", req.body)
        let values=[req.body.name, req.body.trener, req.body.number,dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"),
            req.body.opisanie, req.body.opisaniepodrobno, req.body.idzanytie]
        console.log("values", values)
        try{
            const updateZanytie="UPDATE fit.zanytie SET nazvanie=?,idtrenera=?, numberzal=?, datetime=?, opisanie=?, opisaniepodrobno=?  WHERE idzanytie=?;"
            db.query(updateZanytie, values,(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });
        }
        catch (e) {
            return res.status(400).json({message:'Ответил'})
        }



    }
)

module.exports=router