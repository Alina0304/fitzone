const {Router} = require('express');
//const  User = require('../models/user')
const config =require("../config/default.json")
//хеширование паролей
const bcrypt = require('bcryptjs');
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
// /api/trener/trenersPage
router.get(
    '/trenersPage',
    async (req, res) => {
        try{
            const trener="SELECT idtrener,fio_trener,stag,phone,img FROM fit.trener;"
            db.query(trener, [],(err, result)=>{
                console.log("Error",err)
                console.log("Результат выборки",result);

                res.json({result});

            });

        }catch (e) {
            res.status(500).json({message:"Что-то пошло не так, поробуйте снова"});
        }

    })

module.exports=router