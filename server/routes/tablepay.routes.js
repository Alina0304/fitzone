const {Router} = require('express');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')
const router=Router()

// /api/tablepay/
// router.get(
//     '/tablepay/:id', auth,
//     async (req, res) => {
//         console.log("НУЖНЫЙ ПАРАМЕТР",req.params.id)
//         try{
//             const tablePay=`SELECT personaltren.idpt, zanytie.nazvanie,personaltren.idtrener, personaltren.datatime,
// personaltren.idclent, trenersdata.FIO_cl AS fio_trener, trener.idtrener from personaltren
// JOIN zanytie ON zanytie.idzanytie=personaltren.idzan
// JOIN trener ON trener.idtrener=personaltren.idtrener
// JOIN account_kl AS trenersdata ON trenersdata.id=trener.idtrener
// WHERE personaltren.idclent=?;`
//             db.query(tablePay, [req.params.id],(err, result)=>{
//
//                 console.log("Error",err)
//                 console.log("Результат выборки",result);
//
//                 res.json({result});
//
//             });
//
//         }catch (e) {
//             console.log(e)
//             res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
//         }
//     })
//
// router.post(
//     '/payinfo/:id', auth,
//     async (req, res) => {
//         console.log("НУЖНЫЙ ПАРАМЕТР",req.params.id)
//         console.log("Сведения о тренировке", req.body.card)
//         try{
//             const tablePay=`SELECT personaltren.idpt, personaltren.idtrener, zanytie.sum from personaltren
// JOIN zanytie ON zanytie.idzanytie=personaltren.idzan
// where personaltren.idpt=?;`
//             db.query(tablePay, [req.body.card],(err, result)=>{
//
//                 console.log("Error",err)
//                 console.log("Результат выборки",result);
//
//                 res.json({result});
//
//             });
//
//         }catch (e) {
//             console.log(e)
//             res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
//         }
//     })

router.post(
    '/insertinfo/:id', auth,
    async (req, res) => {
        console.log("НУЖНЫЙ ПАРАМЕТР",req.params.id)
        console.log("Сведения о тренировке",req.body[0].idtrener,"+", req.body.idpt)
        try{
            const tablePay=`INSERT INTO paypersonaltren (idclient,idtrener,datepay,idtrenerovki) VALUES (?, ?, now(), ?);`
            db.query(tablePay, [req.params.id, req.body[0].idtrener, req.body[0].idpt],(err, result)=>{

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