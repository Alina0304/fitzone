const {Router} = require('express');
const dateFormat = require('dateformat');
const router=Router()
const db = require('../config/db.conn')

// /api/trener/zanytiyPage
router.get(
    '/zanytiyPage',
    async (req, res) => {
        try{
            const zanytie=`SELECT fit.zanytie.idzanytie, fit.zanytie.idtrenera, fit.zanytie.datetime, 
                           fit.zanytie.numberzal, fit.zanytie.nazvanie, fit.zanytie.opisanie,fit.zanytie.opisaniepodrobno,
                            fit.zanytie.img, fit.trener.fio_trener
                            FROM fit.zanytie JOIN fit.trener ON fit.zanytie.idtrenera=fit.trener.idtrener;`
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
        let values=[req.body.name,dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"), req.body.number, req.body.trener,
            req.body.opisanie, req.body.opodrobno]
        console.log("values", values)
        try{


          /*  console.log("values", values)
            const insertPt="INSERT INTO fit.personaltren(idclent, idtrener, datatime,name) VALUES (?,?,?,?);"
            db.query(insertPt, values,(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});*/

            //});
        }
        catch (e) {
            return res.status(400).json({message:'Ответил'})
        }



    }
)

module.exports=router