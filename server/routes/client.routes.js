const {Router} = require('express');
const auth = require('../middlewear/auth.middlewear')
const db = require('../config/db.conn')
const router=Router()

// /api/client/clientPage
router.get(
    '/clientPage/:id', auth,
    async (req, res) => {
        try{
            console.log("req params", req.params.id)
            const client=`SELECT account_kl.id,account_kl.FIO_cl,account_kl.Age,account_kl.Phone, account_kl.id_abon, account_kl.Activity, account_kl.DateActivity, account_kl.img,
 personaltren.idpt,personaltren.idclent,personaltren.idtrener,personaltren.datatime,personaltren.name,trener.fio_trener
  FROM fit.account_kl 
JOIN fit.personaltren ON personaltren.idclent=account_kl.id 
JOIN fit.trener ON trener.idtrener=personaltren.idtrener WHERE account_kl.id=?;`
            db.query(client, [req.params.id],(err, result)=>{

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