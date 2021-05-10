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
            const client=`SELECT clientsdata.id,clientsdata.FIO_cl, clientsdata.img,  trenersdata.FIO_cl AS fio_trener, 
personaltren.idpt,personaltren.status,personaltren.datatime,zanytie.nazvanie FROM fit.account_kl AS clientsdata
JOIN fit.personaltren ON clientsdata.id=personaltren.idclent
JOIN fit.trener ON personaltren.idtrener=trener.idtrener
JOIN fit.account_kl AS trenersdata ON trener.idtrener=trenersdata.id
JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
WHERE clientsdata.id=? order by personaltren.datatime;`
            db.query(client, [req.params.id],(err, result)=>{
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
            const admin=`SELECT clientsdata.id, clientsdata.FIO_cl, trenersdata.FIO_cl, clientsdata.Age, clientsdata.Phone, clientsdata.Activity, clientsdata.img,
 personaltren.idpt,personaltren.idclent,personaltren.idtrener,personaltren.datatime,zanytie.nazvanie,personaltren.status FROM fit.account_kl AS clientsdata
JOIN fit.personaltren ON personaltren.idclent=clientsdata.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener 
JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener order by clientsdata.FIO_cl, personaltren.datatime;`
            db.query(admin,[],(err, result)=>{
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
            const trener=`SELECT clientsdata.id,clientsdata.FIO_cl,clientsdata.Age,clientsdata.Phone, clientsdata.id_abon, clientsdata.Activity, clientsdata.DateActivity, clientsdata.img,
 personaltren.idpt,personaltren.idclent,personaltren.idtrener,personaltren.datatime,zanytie.nazvanie,personaltren.status, trenersdata.FIO_cl AS fio_trener
  FROM fit.account_kl AS clientsdata
JOIN fit.personaltren ON personaltren.idclent=clientsdata.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener 
JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener WHERE personaltren.idtrener=? order by personaltren.datatime;`
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