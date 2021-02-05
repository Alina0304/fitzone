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
// /api/nouting/noutigpt
router.get(
    '/noutingpt',
    async (req, res) => {
        try{
            const trenerovki="SELECT zanytie.idzanytie,zanytie.nazvanie, trener.fio_trener, zanytie.img FROM fit.zanytie JOIN fit.trener ON fit.zanytie.idtrenera=fit.trener.idtrener;"
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
    '/inserting',
    async (req, res)=>{
        console.log(req)
    }
)
module.exports=router