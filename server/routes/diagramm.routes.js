const {Router} = require('express');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')
const router=Router()

// /api/diagramm/
router.get(
    '/diagramTrenerClient',
    async (req, res) => {
        try{
            const trenerClient=`SELECT personaltren.idtrener,account_kl.FIO_cl, trener.idtrener, COUNT(*) AS Всего FROM 
personaltren 
JOIN trener ON personaltren.idtrener=trener.idtrener 
JOIN account_kl ON account_kl.id=trener.idtrener 
JOIN auth ON auth.idauth=account_kl.id AND auth.role='tren'
group by personaltren.idtrener;`
            db.query(trenerClient, [],(err, result)=>{

                 console.log("Error",err)
                 console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })

//ВОЗМОЖНО НЕ НУЖНА?!?!?!
router.get(
    '/diagramTrenData',
    async (req, res) => {
        try{
            const trenerovkaData=`SELECT personaltren.idtrener,zanytie.nazvanie,personaltren.datatime,trenersdata.FIO_cl AS fio_trener, trener.idtrener, COUNT(*) as colichestvo
 FROM personaltren JOIN trener ON personaltren.idtrener=trener.idtrener 
 JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
 JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener
 group by zanytie.nazvanie;`
            db.query(trenerovkaData, [],(err, result)=>{
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