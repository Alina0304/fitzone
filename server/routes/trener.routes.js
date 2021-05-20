const {Router} = require('express');
//const  User = require('../models/user')
const config =require("../config/default.json")
//хеширование паролей
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const mysql=require('mysql');
const db=require('../config/db.conn')
const router=Router()

// /api/trener/trenersPage
router.get(
    '/trenersPage',
    async (req, res) => {
        try{
            const trener=`SELECT trener.idtrener,account_kl.FIO_cl AS fio_trener,trener.stag,account_kl.phone,trener.kategory,account_kl.img,
trener.opisanie,trener.citat FROM fit.trener, fit.account_kl WHERE account_kl.id=trener.idtrener;`
            db.query(trener, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            return res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })
router.post(
    '/trenersPage',
    async (req, res) => {
        console.log("req.body", req.body)
        let values=[req.body.name, req.body.stag, req.body.phone,req.body.kategory,
            req.body.opisanie, req.body.citat, req.body.trener]
        console.log("values", values)
        try{
            const updateTrener=`UPDATE fit.trener JOIN fit.account_kl ON trener.idtrener=account_kl.id SET FIO_cl=?,
stag=?, account_kl.phone=?, kategory=? opisanie=?, citat=? WHERE idtrener=?;`
            db.query(updateTrener, values,(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);
                res.json({result});

            });

        }catch (e) {
            return res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })

module.exports=router