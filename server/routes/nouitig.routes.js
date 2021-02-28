const {Router} = require('express');
const router=Router()
const dateFormat = require('dateformat');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')

// /api/nouting/noutigpt
router.get(
    '/noutingpt/:id',auth,
    async (req, res) => {
        try{
            const trenerovki="SELECT zanytie.idzanytie,zanytie.nazvanie,zanytie.opisanie,zanytie.opisaniepodrobno, trener.fio_trener,trener.idtrener, zanytie.img FROM fit.zanytie JOIN fit.trener ON fit.zanytie.idtrenera=fit.trener.idtrener;"
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
        console.log("id", dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"))
        let values=[+req.params.id,req.body.idtrener,dateFormat(req.body.selectedDate,"yyyy-mm-dd HH:MM:ss"),req.body.nazvanie]
        try{


            console.log("values", values)
            const insertPt="INSERT INTO fit.personaltren(idclent, idtrener, datatime,name) VALUES (?,?,?,?);"
            db.query(insertPt, values,(err, result)=>{
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