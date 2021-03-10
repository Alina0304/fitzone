const {Router} = require('express');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')
const router=Router()

// /api/client/clientPage
router.get(
    '/clientPage/client/:id', auth,
    async (req, res) => {
        try{
            console.log("req params", req.params.id)
            const client=`SELECT account_kl.id,account_kl.FIO_cl,account_kl.Age,account_kl.Phone, account_kl.id_abon, account_kl.Activity, account_kl.DateActivity, account_kl.img,
 personaltren.idpt,personaltren.status,personaltren.idclent,personaltren.idtrener,personaltren.datatime,personaltren.name,trener.fio_trener
  FROM fit.account_kl 
JOIN fit.personaltren ON personaltren.idclent=account_kl.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener WHERE account_kl.id=?;`
            db.query(client, [req.params.id],(err, result)=>{

               // console.log("Error",err)
                //console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
// /api/client/clientPage/admin
router.get(
    '/clientPage/admin/:id', auth,
    async (req, res) => {
        try{
            console.log("req params", req.params.id)
            const admin=`SELECT account_kl.id,account_kl.FIO_cl,account_kl.Age,account_kl.Phone, account_kl.id_abon, account_kl.Activity, account_kl.DateActivity, account_kl.img,
 personaltren.idpt,personaltren.idclent,personaltren.idtrener,personaltren.datatime,personaltren.name,personaltren.status,trener.fio_trener
  FROM fit.account_kl 
JOIN fit.personaltren ON personaltren.idclent=account_kl.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener;`
            db.query(admin,[],(err, result)=>{

               // console.log("Error",err)
               // console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
// /api/client/clientPage/trener
router.get(
    '/clientPage/trener/:id', auth,
    async (req, res) => {
        try{
            console.log("req params", req.params.id)
            const trener=`SELECT account_kl.id,account_kl.FIO_cl,account_kl.Age,account_kl.Phone, account_kl.id_abon, account_kl.Activity, account_kl.DateActivity, account_kl.img,
 personaltren.idpt,personaltren.idclent,personaltren.idtrener,personaltren.datatime,personaltren.name,personaltren.status,trener.fio_trener
  FROM fit.account_kl 
JOIN fit.personaltren ON personaltren.idclent=account_kl.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener WHERE personaltren.idtrener=?;`
            db.query(trener,[req.params.id],(err, result)=>{

                // console.log("Error",err)
                 //console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.post(
    '/clientPage/admin/updating/:id',auth,
    async (req, res)=>{
        try{
console.log("Обработка запроса", req.body.idpt)
           const updateStatus=`UPDATE fit.personaltren SET personaltren.status=? WHERE fit.personaltren.idpt=?;`
            db.query(updateStatus, [req.body.statusNew,req.body.idpt],(err, result)=>{
               //console.log("Error",err)
               //console.log("Результат выборки",result);

               res.json({result});

            });
        }
        catch (e) {
            return res.status(400).json({message:'Ответил'})
        }

    }
)
module.exports=router