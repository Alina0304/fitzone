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
            const client=`SELECT clientsdata.id,clientsdata.FIO_cl, clientsdata.img FROM fit.account_kl AS clientsdata WHERE clientsdata.id=?;`
            db.query(client, [req.params.id],(err, result)=>{
                res.json({result});

            });

        }catch (e) {
            console.log(e)
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }
    })
router.get(
    '/clientPage/clientstren/:id', auth,
    async (req, res) => {
        try{
            console.log("req params", req.params.id)
          const clientsTren=`SELECT DISTINCT trenersdata.FIO_cl AS fio_trener,
                personaltren.idpt AS id,personaltren.status,DATE_FORMAT(personaltren.datatime,'%d.%m.%Y %H:%i') AS datatime,zanytie.nazvanie, paypersonaltren.summ AS oplacheno, zanytie.sum AS sumkoplate FROM fit.account_kl AS clientsdata
            JOIN fit.personaltren ON clientsdata.id=personaltren.idclent
            JOIN fit.trener ON personaltren.idtrener=trener.idtrener
            JOIN fit.account_kl AS trenersdata ON trener.idtrener=trenersdata.id
            JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
            JOIN fit.paypersonaltren ON personaltren.idpt=paypersonaltren.idtrenerovki
            WHERE clientsdata.id=? order by personaltren.datatime;`
            db.query(clientsTren, [req.params.id],(err, result)=>{
                console.log("Результат", result)
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
            const admin=`SELECT personaltren.idpt AS id,clientsdata.FIO_cl, trenersdata.FIO_cl AS fio_trener,DATE_FORMAT(personaltren.datatime,'%d.%m.%Y %H:%i') AS datatime,zanytie.nazvanie,personaltren.status FROM fit.account_kl AS clientsdata
JOIN fit.personaltren ON personaltren.idclent=clientsdata.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener 
JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener order by personaltren.idpt;`
            db.query(admin,[],(err, result)=>{
                console.log("Результат ", result)
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
            const trener=`SELECT clientsdata.FIO_cl,clientsdata.Age,clientsdata.Phone, personaltren.idpt AS id,DATE_FORMAT(personaltren.datatime,'%d.%m.%Y %H:%i') AS datatime,
zanytie.nazvanie,personaltren.status
  FROM fit.account_kl AS clientsdata
JOIN fit.personaltren ON personaltren.idclent=clientsdata.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener 
JOIN fit.zanytie ON zanytie.idzanytie=personaltren.idzan
JOIN fit.account_kl AS trenersdata ON trenersdata.id=trener.idtrener WHERE personaltren.idtrener=2 order by personaltren.datatime;`
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
console.log("Обработка запроса", req.body)
           const updateStatus=`UPDATE fit.personaltren SET personaltren.status=? WHERE fit.personaltren.idpt=?;`
            db.query(updateStatus, [req.body.statusNew,req.body.id],(err, result)=>{
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
router.get(
    '/clientPage/roles',
    async (req, res)=>{
        try{
            console.log("Обработка запроса", req.body)
            const allRoles=`SELECT auth.idauth AS id,account_kl.FIO_cl, auth.email, auth.role FROM auth
JOIN account_kl ON auth.idauth=account_kl.id;;`
            db.query(allRoles, [],(err, result)=>{
                res.json({result});
            });
        }
        catch (e) {
            return res.status(400).json({message:'Ответил'})
        }

    }
)
router.post(
    '/clientPage/roles/change',
    async (req, res)=>{
        console.log('roles', req.body)
        try{
            const updateRole=`UPDATE auth SET role=? WHERE idauth=?;`
            db.query(updateRole, [req.body.newRole,req.body.id],(err, result)=>{
                res.json({result});
            });
        }
        catch (e) {
            return res.status(400).json({message:'Ответил'})
        }

    }
)
router.get(
    '/clientPage/allclientsinfo',
    async (req, res)=>{
        try{
            const allClInfo=` SELECT account_kl.id, account_kl.FIO_cl, DATE_FORMAT(account_kl.Age,'%d.%m.%Y') AS Age, 
 account_kl.Phone, abonement.type, aboninfo.srok, abonpay.Activity, DATE_FORMAT(abonpay.DateActivity,'%d.%m.%Y') AS DateActivity,
  DATE_FORMAT(DATE_ADD(abonpay.DateActivity, INTERVAL srok DAY),'%d.%m.%Y') AS endOfActivity FROM account_kl JOIN abonpay 
  ON abonpay.idclient=account_kl.id 
 JOIN aboninfo ON abonpay.idabon=aboninfo.id 
 JOIN auth ON account_kl.id=auth.idauth
 JOIN abonement ON aboninfo.idtype=abonement.id
 WHERE role='cl';`
            db.query(allClInfo, [],(err, result)=>{
                res.json({result});
            });
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    }
)

module.exports=router