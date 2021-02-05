const {Router} = require('express');
//const  User = require('../models/user')
const config =require("../config/default.json")
//хеширование паролей
const jwt = require ('jsonwebtoken')
const mysql=require('mysql');
const router=Router()
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'fit',
});
db.connect();
//db.startDB();
// /api/trener/zanytiyPage
router.get(
    '/zanytiyPage',
    async (req, res) => {
        try{
            const zanytie="SELECT idzanytie, idtrenera, datetime, numberzal, nazvanie, opisanie, img FROM fit.zanytie;"
            db.query(zanytie, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })

module.exports=router