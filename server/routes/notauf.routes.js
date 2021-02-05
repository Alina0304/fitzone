const {Router} = require('express');
const mysql=require('mysql');

const router=Router()
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'fit',
});
db.connect();
// /api/notauf/fitzone
router.get(
    '/fitzone',
    async (req, res) => {
        try{
            const trener="SELECT trener.idtrener,trener.fio_trener,trener.stag,trener.phone,trener.img,idzanytie, zanytie.idtrenera, zanytie.datetime, zanytie.numberzal, zanytie.nazvanie, zanytie.opisanie, zanytie.img FROM fit.trener,fit.zanytie;"
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