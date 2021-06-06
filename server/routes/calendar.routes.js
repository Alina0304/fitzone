const {Router} = require('express');
const auth = require('../middlewear/auth.middlewear')
const dateFormat = require('dateformat')

const db=require('../config/db.conn')
const router=Router()

// /api/calendar
router.get(
    '/calendarinfo',
    async (req, res) => {
        console.log("ID", req.params.id)
        try{
            const calendar=`SELECT account_kl.FIO_cl AS title,treners.FIO_cl,zanytie.nazvanie, DATE_FORMAT(personaltren.datatime,'%Y-%m-%d %H:%i') AS 'start',
DATE_FORMAT(personaltren.datatimeend,'%Y-%m-%d %H:%i') AS 'end' FROM personaltren 
     JOIN account_kl ON personaltren.idclent=account_kl.id
     JOIN trener ON trener.idtrener=personaltren.idtrener
     JOIN account_kl AS treners ON trener.idtrener=treners.id
     JOIN zanytie ON personaltren.idzan=zanytie.idzanytie;`
            db.query(calendar, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
module.exports=router